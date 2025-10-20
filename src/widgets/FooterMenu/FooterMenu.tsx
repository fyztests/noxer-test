import Button from '@/shared/ui/Button';
import IconBase, {type IconName} from '@/shared/ui/icons/IconBase'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import styles from './FooterMenu.module.scss'

const items: { name: IconName; label: string; to: string }[] = [
  { name: 'home',    label: 'Главная',  to: '/' },
  { name: 'catalog', label: 'Каталог',  to: '/catalog' },
  { name: 'like',    label: 'Избранное',to: '/favorites' },
  { name: 'cart',    label: 'Корзина',  to: '/cart' },
  { name: 'account', label: 'Профиль',  to: '/account' },
]

const FooterMenu = () => {

  return (
    <nav aria-label='Нижнее меню'>
      <ul className={styles.nav}>
        {items.map(({name, label, to}) => (
          <li className={styles.navigation} key={name}>
            <NavLink
              to={to}
              replace
              className={({ isActive }) => classNames(styles.link, isActive && styles.active)}
              aria-label={label}
              end
            >
              <Button variant='icon'>
                <IconBase
                  className={styles.icon}
                  name={name}
                  width={21}
                  height={21}
                />
              </Button>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterMenu