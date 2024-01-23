import { $mode } from "@/context/mode";
import { useStore } from "effector-react";
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturers, setPartsManufacturers, updateBoilerManufacturer, updatePartsManufacturer } from "@/context/boilerParts";
import FilterManufacturerAccardion from "./FilterManufacturerAccardion";
import Accordion from "@/components/elements/Accordion/Accordion";
import PriceRange from "./PriceRange";
import { ICatalogFiltersDesktopProps } from "@/types/catalog";
import styles from '@/styles/Catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';

const CatalogFiltersDesktop = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    spinner,
    resetFilters,
    applyFilters,

}: ICatalogFiltersDesktopProps) => {
    const mode = useStore($mode);
    const boilerManufacturers = useStore($boilerManufacturers);
    const partsManufacturers = useStore($partsManufacturers);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;
    return(
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass}`}>
            <h3 className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>
            Фильтры
            </h3>
            <div className={styles.filters__boiler_manufacturers}>
                <FilterManufacturerAccardion 
                manufacturersList={boilerManufacturers} 
                title={'Производитель котлов'} 
                setManufacturer={setBoilerManufacturers} 
                updateManufacturer={updateBoilerManufacturer}
                />
            </div>
            <div className={styles.filters__price}>
                <Accordion
                title={'Цена'}
                titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
                arrowOpenClass={styles.open}
                >
                    <div className={styles.filters__manufacturer__inner}>
                        <PriceRange
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        setIsPriceRangeChanged={setIsPriceRangeChanged}
                        />
                    </div>
                </Accordion>
            </div>
            <div className={styles.filters__boiler_manufacturers}>
                <FilterManufacturerAccardion 
                manufacturersList={partsManufacturers} 
                title={'Производитель запчастей'} 
                setManufacturer={setPartsManufacturers} 
                updateManufacturer={updatePartsManufacturer}
                />
            </div>
            <div className={styles.filters__actions}>
                <button 
                className={styles.filters__actions__show} 
                disabled={spinner || resetFilterBtnDisabled}
                onClick={applyFilters}
                >
                    {spinner? <span className={spinnerStyles.spinner} style={{top: 6, left: '47%'}}/> : 'Показать'}
                </button>
                <button 
                className={styles.filters__actions__reset} 
                disabled={resetFilterBtnDisabled}
                onClick={resetFilters}
                >
                Сбросить
                </button>
            </div>
        </div>

    )
}        

export default CatalogFiltersDesktop;