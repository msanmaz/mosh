import {  setServerState } from 'lib/redux'
import { readCache } from 'lib/cache'

const commonProps = async store => {
	// read cache from file ({products, categories, merchant})
	const cache = await readCache()

	// take the data common to all generated pages (just merchant and categories)
	const common = { ...cache }

	// we remove products from common props because it's usually huge and is definitely not used in Layout
	delete common.products

	// dispatch common props to server store
	// this is needed so that the Layout component will also have access to the common props
	store.dispatch(setServerState(common))

	return cache
}

export default commonProps