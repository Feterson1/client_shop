import { $mode } from '@/context/mode';
import { useStore } from 'effector-react';
import styles from '@/styles/Catalog/index.module.scss';
import { AnimatePresence } from 'framer-motion';
import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock';
import FilterSelect from './FilterSelect';
const CatalogPage = () => {

    const mode = useStore($mode);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;

    return(
        <section className={styles.catalog}>
            <div className={`container ${styles.catalog__container}`}>
                <h2 className={`${styles.catalog__title} ${darkModeClass}`}>Каталог товаров</h2>
                <div className={`${styles.catalog__top} ${darkModeClass}`}>
                    <AnimatePresence>
                        <ManufacturersBlock title='Производитель котлов:'/>
                    </AnimatePresence>
                    <AnimatePresence>
                    <ManufacturersBlock title='Производитель запчастей:'/>
                    </AnimatePresence>
                    <div className={styles.catalog__top__inner}>
                        <button>Сбросить фильтр</button>
                        <FilterSelect/>
                    </div>

                </div>
                <div className={`${styles.catalog__bottom} ${darkModeClass}`}>

                </div>

            </div>
        </section>
    )

}

export default CatalogPage;