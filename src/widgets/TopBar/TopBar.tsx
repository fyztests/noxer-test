import Button from '@/shared/ui/Button'
import BaseIcon from '@/shared/ui/icons/BaseIcon';
import styles from './TopBar.module.scss'
import useSearch from '@/entities/search/useSearch.ts';


const TopBar = () => {
  const {
    isSearchFocused,
    setIsSearchFocused,
  } = useSearch()

  const icon = isSearchFocused ? 'arrowLeft' : 'close'
  const label = isSearchFocused ? 'Назад' : 'Закрыть'

  return (
    <div className={styles.topBar}>
      <Button
        className={styles.leftButton}
        variant='ghost'
        onClick={() => setIsSearchFocused(false)}
      >
        <BaseIcon
          name={icon}
          width={9}
          height={9}
          aria-label='Иконка Close'
        />
        {label}
      </Button>
      <a
        className={styles.link}
        href="https://t.me/noxerai_bot"
        target="_blank"
      >
        <BaseIcon
          className={styles.linkIcon}
          name='tgBig'
          width={24}
          height={24}
          aria-label='Иконка Telegram'
        />
        наш tg-канал
      </a>
      <div className={styles.buttonsWrapper}>
        <Button variant='iconSmall'>
          <BaseIcon
            name='arrowDown'
            width={14}
            height={8}
          />
        </Button>
        <Button variant='iconSmall'>
          <BaseIcon
            name='moreDots'
            width={13}
            height={8}
          />
        </Button>
      </div>

    </div>
  )
}

export default TopBar