import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { $boilerPart } from '@/context/boilerPart'
import PartImagesList from '@/components/modules/PartPage/PartImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shoppingCart'
import { useEffect, useState } from 'react'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import styles from '@/styles/Part/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import PartTabs from '@/components/modules/PartPage/PartTabs'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { getBoilerPartsFx } from '@/app/api/boilerParts'
import { toast } from 'react-toastify'
import {
  $boilerParts,
  setBoilerParts,
  setBoilerPartsByPopularity,
} from '@/context/boilerParts'

const CatalogPartPage = () => {
  const mode = useStore($mode)
  const user = useStore($user)
  const isMobile = useMediaQuery(850)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``
  const boilerPart = useStore($boilerPart)
  const boilerParts = useStore($boilerParts)
  const cartItems = useStore($shoppingCart)
  const isInCart = cartItems.some((item) => item.partId === boilerPart.id)
  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)
  const [spinnerSlider, setSpinnerSlider] = useState(false)
  const toggleToCart = () => {
    toggleCartItem(user.username, boilerPart.id, isInCart, setSpinnerToggleCart)
  }
  const loadBoilerPart = async () => {
    try {
      setSpinnerSlider(true)
      const data = await getBoilerPartsFx(`/boiler-parts/?limit=20&offset=0`)
      setBoilerParts(data)
      setBoilerPartsByPopularity()
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setTimeout(() => setSpinnerSlider(false), 1000)
    }
  }
  useEffect(() => {
    loadBoilerPart()
  }, [])
  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2>{boilerPart.name}</h2>
          <div className={styles.part__inner}>
            <PartImagesList />
            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.price || 0)}₽
              </span>
              <span className={`${styles.part__info__stock}`}>
                {boilerPart.in_stock > 0 ? (
                  <span className={styles.part__info__stock__success}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={styles.part__info__stock__not}>
                    Нет на складе
                  </span>
                )}
              </span>
              <span className={styles.part__info__code}>
                Артикул:{boilerPart.vendor_code}
              </span>
              <button
                className={`${styles.cart__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span className={styles.part__info__btn__icon}>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавлено в корзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>
              {!isMobile && <PartTabs />}
            </div>
          </div>
        </div>
        {isMobile && (
          <div className={styles.part__accardion}>
            <div className={styles.part__accardion__inner}></div>
          </div>
        )}
        <div className={`${styles.part__bottom} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={boilerParts.rows || []}
          />
        </div>
      </div>
    </section>
  )
}

export default CatalogPartPage
