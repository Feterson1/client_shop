import { useStore } from "effector-react";
import { forwardRef, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { $mode } from "@/context/mode";
import { IWrappedComponentProps } from "@/types/common";
import { withClickOuside } from '@/utils/withClickOutside';
import styles from '@/styles/CartPopUp/index.module.scss';
import ShoppingCartSvg from "@/components/elements/ShoppingCartSvg/ShoppingCartSvg";
import { $shoppingCart, setShoppingCart } from "@/context/shoppingCart";
import Link from "next/link";
import CartPopUpItem from "./CartPopUpItem";
import { getCartItemsFx } from "@/app/api/shopping-cart";
import { $user } from "@/context/user";
import { toast } from "react-toastify";




const CartPopUp = forwardRef<HTMLDivElement, IWrappedComponentProps>(({open,setOpen},ref) => {
    
    const mode = useStore($mode);
    const user = useStore($user);
    const shoppingCart = useStore($shoppingCart);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;

    useEffect(()=>{
        loadCartItems();
    },[])

    const loadCartItems = async () => {
        try {
            const cartItems = await getCartItemsFx(`/shopping-cart/${user.userId}`);
            setShoppingCart(cartItems);
        } catch (error) {
            toast.error((error as Error).message);
            
        }

    }

    
    const toggleCartDropDown = () => setOpen(!open)

    return (
        <div 
        className={styles.cart} 
        ref={ref}
        >
            <button className={`${styles.cart__btn} ${darkModeClass}`} onClick={toggleCartDropDown}>
               {!!shoppingCart.length && 
                <span className={styles.cart__btn__count}>{shoppingCart.length}</span>
               } 
                <span className={styles.cart__svg}><ShoppingCartSvg/></span>
                <span className={styles.cart__text}>Корзина</span>
            </button>
            <AnimatePresence>
            {open && 
            <motion.ul
            initial= {{opacity:0,scale:0}}
            animate= {{opacity:1,scale:1}}
            exit= {{opacity:0,scale:0}}
            className={`${styles.cart__popup} ${darkModeClass}`}
            style={{transformOrigin: 'right_top'}}
            >
                <h3 className={styles.cart__popup__title}>Корзина</h3>
                <ul className={styles.cart__popup__list}>
                    {
                        shoppingCart.length? 
                        shoppingCart.map((item) => <CartPopUpItem key={item.id} item={item}/>) 
                        : 
                        (<li className={styles.cart__popup__empty}>
                            <span className={`${styles.cart__popup__empty__text} ${darkModeClass}`}>Корзина пуста</span>
                        </li>)
                    }
                </ul>
                <div className={styles.cart__popup__footer}>
                    <div className={styles.cart__popup__footer__total}>
                        <span className={`${styles.cart__popup__footer__text} ${darkModeClass}`}>Общая сумма заказа:</span>
                        <span className={styles.cart__popup__footer__price}>0</span>
                    </div>
                    <Link 
                    href={'/order'} 
                    passHref 
                    legacyBehavior
                    >
                        <button className={styles.cart__popup__footer__btn} disabled={!shoppingCart.length}>Оформить заказ</button>
                    </Link>

                </div>


            </motion.ul> }
            </AnimatePresence>

        </div>
    )
    
    
   

})


CartPopUp.displayName = 'CartPopUp'

export default withClickOuside(CartPopUp);