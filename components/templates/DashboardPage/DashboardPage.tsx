import getBetsellerOrNewPartsFx from '@/app/api/boilerParts';
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSliders';
import CartAlert from '@/components/modules/DashboardPage/CartAlert';
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider';
import { $mode } from '@/context/mode';
import { $shoppingCart } from '@/context/shoppingCart';
import styles from '@/styles/Dashboard/index.module.scss';
import { IBoilerParts } from '@/types/boilerParts';
import { useStore } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const DashboardPage = () => {

    const [newParts,setNewParts] = useState<IBoilerParts>({} as IBoilerParts);
    const [betsellersParts,setBetsellersParts] = useState<IBoilerParts>({} as IBoilerParts);
    const [spinner,setSpinner] = useState(false);
    const shoppingCart = useStore($shoppingCart);
    const [showAlert,setShowAlert] = useState(!!shoppingCart.length);

    const mode = useStore($mode);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;

    const loadBoilerParts = async () => {
       try {
        setSpinner(true);
        const betsellerParts = await getBetsellerOrNewPartsFx('/boiler-parts/betsellers');
        const newParts = await getBetsellerOrNewPartsFx('/boiler-parts/new');

        setBetsellersParts(betsellerParts);
        setNewParts(newParts);

        
       } catch (error) {
        toast.error((error as Error).message);
       }finally{
        setSpinner(false)
       }
    }

    useEffect(()=> {
        loadBoilerParts();
    },[])

    const closeAlert = () => {
        setShowAlert(false);
    }

    return (
        <section className={styles.dashboard}>
            <div className={`container ${styles.dashboard__container}`}>
                <AnimatePresence>
                    {showAlert && (
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    className={`${styles.dashboard__alert} ${darkModeClass}`}
                    >
                        <CartAlert count={shoppingCart.length} closeAlert={closeAlert}/>
                    </motion.div>)}
                </AnimatePresence>
                <div className={styles.dashboard__brands}>
                    <BrandsSlider/>
                </div>
                <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
                    Детали для газовых котлов
                </h2>
                <div className={styles.dashboard__parts}>
                    <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
                        Хиты продаж
                    </h3>
                    <DashboardSlider items={betsellersParts.rows || []} spinner={spinner} />
                </div>
                <div className={styles.dashboard__parts}>
                    <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
                        Новинки
                    </h3>
                    <DashboardSlider items={newParts.rows || []} spinner={spinner} />
                </div>
                <div className={styles.dashboard__about}>
                    <h3 
                    className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}
                    >
                        О компании
                    </h3>
                    <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
                    Инструкции и схемы помогут разобраться в эксплуатации, определить неисправность и правильно выбрать запчасть для ремонта Вашего газового оборудования. Купить запчасть, деталь для ремонта газового котла возможно в любом населенном пункте Российской Федерации:
Осуществляем доставку запчасти к газовым котлам в следующие города: Москва, Санк-Петербург.
                    </p>
                </div>

            </div>
        </section>
        
    )
}

export default DashboardPage;