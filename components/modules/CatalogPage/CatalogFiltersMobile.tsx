import { $mode } from "@/context/mode";
import { ICatalogFiltersMobileProps } from "@/types/catalog";
import { useStore } from "effector-react";
import styles from '@/styles/Catalog/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import FiltersPopUpTop from "./FiltersPopUpTop";
import FiltersPopup from "./FiltersPopup";
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturers, setPartsManufacturers, updateBoilerManufacturer, updatePartsManufacturer } from "@/context/boilerParts";
import { useState } from "react";
import Accordion from "@/components/elements/Accordion/Accordion";
import PriceRange from "./PriceRange";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const CatalogFiltersMobile = ({
    spinner,
    resetFilterBtnDisabled,
    resetFilters,
    ClosePopup,
    applyFilters,
    filtersMobileOpen,
    priceRange,
    setIsPriceRangeChanged,
    setPriceRange,
}:ICatalogFiltersMobileProps) => {

    const [openBoilers,setOpenBoilers] = useState(false);
    const [openParts,setOpenParts] = useState(false);
    const mode = useStore($mode);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;
    const isMobile = useMediaQuery(820);

    const boilerManufacturers = useStore($boilerManufacturers);
    const partsManufacturers = useStore($partsManufacturers);

    const handleOpenBoilers = () => setOpenBoilers(true);
    const handleCloseBoilers = () => setOpenBoilers(false);

    const handleOpenParts = () => setOpenParts(true);
    const handleCloseParts = () => setOpenParts(false);
    
    const isAnyBoilerManufacturerChecked = boilerManufacturers.some((item) => item.checked);
    const isAnyPartsManufacturerChecked = partsManufacturers.some((item) => item.checked);

    const resetAllBoilerManufacturers = () => setBoilerManufacturers(boilerManufacturers.map((item) => ({...item,checked: false,})));
    const resetAllPartsManufacturers = () => setPartsManufacturers(partsManufacturers.map((item) => ({...item,checked: false,})));

    const applyFiltersAndClosePopup = () => {

        ClosePopup();
        applyFilters();

    }

    return(
        <div className={`${styles.catalog__bottom__filters} ${darkModeClass} ${filtersMobileOpen? styles.open : ''}`}>
            
            <div className={styles.catalog__bottom__filters__inner}>
                <FiltersPopUpTop
                resetBtnText="Сбросить всё"
                title="Фильтры"
                resetFilters={resetFilters}
                resetFilterBtnDisabled={resetFilterBtnDisabled}
                ClosePopup={ClosePopup}
                />
          
            <div className={styles.filters__boiler_manufacturers}>
                <button
                className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
                onClick={handleOpenBoilers}
                >
                    Производитель котлов
                </button>
                <FiltersPopup
                    title={'Производитель котлов'}
                    resetFilterBtnDisabled={!isAnyBoilerManufacturerChecked}
                    handleClosePopup={handleCloseBoilers}
                    resetAllManufacturers={resetAllBoilerManufacturers} 
                    applyFilters={applyFiltersAndClosePopup} 
                    openPopup={openBoilers} 
                    manufacturersList={boilerManufacturers} 
                    setManufacturer={setBoilerManufacturers} 
                    updateManufacturer={updateBoilerManufacturer}                
                />

            </div>
            <div className={styles.filters__boiler_manufacturers}>
                <button
                className={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
                onClick={handleOpenParts}
                >
                    Производитель запчасте
                </button>
                <FiltersPopup
                    title={'Производитель запчастей'}
                    resetFilterBtnDisabled={!isAnyPartsManufacturerChecked}
                    handleClosePopup={handleCloseParts}
                    resetAllManufacturers={resetAllPartsManufacturers} 
                    applyFilters={applyFiltersAndClosePopup} 
                    openPopup={openParts} 
                    manufacturersList={partsManufacturers} 
                    setManufacturer={setPartsManufacturers} 
                    updateManufacturer={updatePartsManufacturer}                
                />

            </div>
            <div className={styles.filters__price}>
                <Accordion
                title={'Цена'}
                titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
                hideArrowClass={styles.hide_arrow}
                isMobileForFilters={isMobile}
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
              </div>
            <div className={styles.filters__actions}>
                <button 
                className={styles.filters__actions__show}
                onClick={applyFiltersAndClosePopup}
                disabled={resetFilterBtnDisabled}
                >
                    {
                    spinner? 
                    <span className={spinnerStyles.spinner} style={{top:6,left: '47%'}}/> 
                    : 
                    "Показать"
                    }
                    </button>
            </div>
        </div>

    )


}

export default CatalogFiltersMobile;