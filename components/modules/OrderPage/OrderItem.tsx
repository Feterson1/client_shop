import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import { usePrice } from '@/hooks/usePrice'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CartItemCounter from '@/components/elements/CartItemCounter/CartItemCounter'
import { formatPrice } from '@/utils/common'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import styles from '@/styles/Order/index.module.scss'

const OrderItem = ({ item }: { item: IShoppingCartItem }) => {
  const mode = useStore($mode)
  const isMedia1160 = useMediaQuery(1160)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``
  const { price, spinner, decreasePrice, deleteCartItem, increasePrice } =
    usePrice(item.count, item.partId, item.price)
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  return (
    <li className={styles.order__cart__list__item}>
      <div className={styles.order__cart__list__item__left}>
        <div className={styles.order__cart__list__item__left__inner}>
          <div className={styles.order__cart__list__item__img}>
            <img src={item.image} alt={item.name} />
          </div>
          <Link href={`/catalog/${item.partId}`} passHref legacyBehavior>
            <a
              className={`${styles.order__cart__list__item__text} ${darkModeClass}`}
            >
              <span>
                {item.name.replace('.', '')}, {item.parts_manufacturer},{' '}
                {item.boiler_manufacturer}
              </span>
            </a>
          </Link>
        </div>
        {isMedia1160 && (
          <CartItemCounter
            partId={item.partId}
            totalCount={item.in_stock}
            increasePrice={increasePrice}
            decreasePrice={decreasePrice}
            inititalCount={item.count}
          />
        )}
      </div>
      <div className={styles.order__cart__list__item__right}>
        {!isMedia1160 &&
          (item.in_stock === 0 ? (
            <span className={styles.order__cart__list__item__empty}>
              Нет на складе
            </span>
          ) : (
            <CartItemCounter
              partId={item.partId}
              totalCount={item.in_stock}
              increasePrice={increasePrice}
              decreasePrice={decreasePrice}
              inititalCount={item.count}
            />
          ))}
        <span
          className={`${styles.order__cart__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(price)}₽
        </span>
        <button
          className={styles.order__cart__list__item__delete}
          onClick={deleteCartItem}
        >
          {spinner ? (
            <span
              className={spinnerStyles.spinner}
              style={{ top: '-13px', left: '-30px', width: 25, height: 25 }}
            />
          ) : (
            'Удалить'
          )}
        </button>
      </div>
    </li>
  )
}

export default OrderItem
