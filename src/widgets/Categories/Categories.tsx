import type {Category} from '@/shared/types/categories'
import {useCatalogContext} from '@/entities/catalog/model/CatalogContext'
import styles from './Categories.module.scss'

const Categories = () => {
  const {
    categories,
  } = useCatalogContext()

  return (
    <ul className={styles.list}>
      {categories.map((category: Category) => (
        <li
          className={styles.item}
          key={category.id}
        >
          <img
            className={styles.image}
            src={category?.imageUrl || 'placeholder.jpg'}
            alt={category.name}
            width={79}
            height={79}
          />
          <h2 className={styles.title}>{category.name}</h2>
        </li>
      ))}
    </ul>
  )
}

export default Categories