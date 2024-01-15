import { $mode } from '@/context/mode'
import { ICartItemCounterProps } from '@/types/shopping-cart'
import { useStore } from 'effector-react'
import MinusSvg from '../MinusSvg/MinusSvg'
import PluseSvg from '../PluseSvg/PluseSvg'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { updateCartItemFx } from '@/app/api/shopping-cart'
import { updateCartItemCount } from '@/context/shoppingCart'
import styles from '@/styles/CartPopUp/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CartItemCounter = ({
  totalCount,
  partId,
  inititalCount,
  increasePrice,
  decreasePrice,
}: ICartItemCounterProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const [spinner, setSpinner] = useState(false)
  const [disableIncrease, setDisableIncrease] = useState(false)
  const [disableDecrease, setDisableDecrease] = useState(false)
  const [count, setCount] = useState(inititalCount)

  const increase = async () => {
    try {
      setSpinner(true)
      increasePrice()
      setDisableDecrease(false)
      setCount(count + 1)

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${partId}`,
        payload: { count: count + 1 },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const decrease = async () => {
    try {
      setSpinner(true)
      decreasePrice()
      setDisableIncrease(false)
      setCount(count - 1)

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${partId}`,
        payload: { count: count - 1 },
      })

      updateCartItemCount({ partId, count: data.count })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    }
    if (count === totalCount) {
      setDisableIncrease(true)
    }
  }, [count, totalCount])

  return (
    <div
      className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
    >
      <button disabled={disableDecrease} onClick={decrease}>
        <MinusSvg />
      </button>
      <span>
        {spinner ? (
          <span
            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button disabled={disableIncrease} onClick={increase}>
        <PluseSvg />
      </button>
    </div>
  )
}

export default CartItemCounter
