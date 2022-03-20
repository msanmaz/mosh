require('./loadenv')
const path = require('path')
const fs = require('fs')

const commerce = require('./commerce')

const CACHE_PATH = path.resolve(process.cwd(), 'cache.json')

// Controllers

const fetchMerchant = async () => {
	let merchant = await commerce.merchants.about()
	if ('data' in merchant) {
		merchant = Array.isArray(merchant.data) ? merchant.data[0] : merchant.data
	}
	return merchant
}

const fetchCategories = async () => {
	const { data } = await commerce.categories.list()

	// for (let i = data.length - 1; i >= 0; i--) {
	// 	const a = data[i]
	// 	const { text, options } = parseBrackets(a.description)

	// 	if (options.hidden) {
	// 		data.splice(i, 1)
	// 		continue
	// 	}

	// 	if (!('order' in options)) options.order = 1000

	// 	a.description = text
	// 	a.options = options
	// }

	// data.sort((a, b) => {
	// 	if (a.options.order === b.options.order) {
	// 		if (a.slug < b.slug) return -1
	// 		if (a.slug > b.slug) return 1
	// 		return 0
	// 	}
	// 	return a.options.order - b.options.order
	// })

	return data
}

const fetchProducts = async () => {
	let products = []
	let page = 1
	const getProducts = async () => {
		const { data, meta } = await commerce.products.list({
			page,
			limit: 200,
		})
		page++
		products = products.concat(data)
		if (page <= meta.pagination.total_pages) await getProducts()
	}
	await getProducts()

	let variants = []
	page = 1
	const getVariants = async () => {
		const { data, meta } = await commerce.request('variants?limit=200')
		if (!data || !meta) throw Error('No data or meta')
		page++
		variants = variants.concat(data)
		if (page <= meta.pagination.total_pages) await getVariants()
	}
	await getVariants()

	for (let i = 0; i < products.length; i++) {
		const product = products[i]
		const lookup = {}
		product.variant_groups.forEach(a => {
			lookup[a.id] = a.name
			a.options.forEach(o => {
				lookup[o.id] = o.name
			})
		})
		product.lookup = lookup
		product.variants = variants.filter(v => v.product_id === product.id)
	}

	return products
}

const fetchCommon = async () => {
	const [merchant, categories, products] = await Promise.all([fetchMerchant(), fetchCategories(), fetchProducts()])
	return { merchant, categories, products }
}

// Build cache

const buildCache = async force => {
	const parent_dir = path.dirname(CACHE_PATH)

	if (!fs.existsSync(parent_dir)) {
		console.log(`Cache directory '${parent_dir}' doesn't exist, attempting to create...`)
		fs.mkdirSync(parent_dir, { recursive: true })
	}

	const cache_exists = fs.existsSync(CACHE_PATH)

	if (cache_exists) {
		console.log(`Cache file at ${CACHE_PATH} already exists.`)
	}

	if (cache_exists && !force) {
		const ts = Date.now()
		const { mtimeMs } = fs.statSync(CACHE_PATH)

		const dif = parseInt((ts - mtimeMs) / 60000)
		console.log(`Cache was created ${dif} minutes ago.`)
		if (dif < 10) {
			console.log('Using current cache. To overwrite, use -f')
			return
		}
	}

	console.log('Fetching...')
	const data = await fetchCommon()
	console.log('Fetched')

	fs.writeFileSync(CACHE_PATH, JSON.stringify(data), 'utf8')
	console.log(`Cache file written to ${CACHE_PATH}`)
	process.exit()
}

// Read cache

const readCache = async () => {
	if (fs.existsSync(CACHE_PATH)) {
		return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'))
	}
	console.error(`Cache file not found at ${CACHE_PATH}!`)
	const data = await fetchCommon()
	try {
		fs.writeFileSync(CACHE_PATH, JSON.stringify(data), 'utf8')
	} catch (error) {
		console.error(error)
	}
	console.log(`Cache file regenerated at ${CACHE_PATH}`)
	return data
}

// Clear cache
const deleteCache = () => {
	if (fs.existsSync(CACHE_PATH)) {
		try {
			fs.unlinkSync(CACHE_PATH)
			console.log('Cache file deleted')
		} catch (error) {
			console.error(error.toString())
		}
	} else {
		console.log('Clear cache - file not found')
	}
}

// Exports

module.exports = {
	CACHE_PATH,
	fetchCategories,
	fetchCommon,
	fetchMerchant,
	fetchProducts,
	readCache,
	deleteCache,
}

// Main

if (require.main === module) {
	const arg = process.argv[2]
	if (arg === '--clear') deleteCache()
	else buildCache(arg === '-f')
}