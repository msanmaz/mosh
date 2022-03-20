import {React,useMemo,useState} from 'react'
import styles from './index.module.scss'



const labels = [{test:'1'},{test:'2'}]

const Test = () => {
    const [currentCategory, setCurrentCategory] = useState('')


    const onCategoryClick = e => {
        // console.log('set current category:', e.target.id)
        setCurrentCategory(e.target.id)
    }

    const categoryButtons = useMemo(
		() =>
			labels
				? labels.map(({ test }) => (
						
						<button
							id={test}
							key={test}
							onClick={onCategoryClick}
							className={`${styles.category} ${test === currentCategory ? styles.current_category : ''}`}
						>
							{test}
						</button>
						
				  ))
				: null,

		[currentCategory]
	)

  return (
    <div>{categoryButtons}</div>
  )
}

export default Test