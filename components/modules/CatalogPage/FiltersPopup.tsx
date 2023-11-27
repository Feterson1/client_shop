import { $mode } from "@/context/mode";
import { useStore } from "effector-react";
import styles from '@/styles/Catalog/index.module.scss';
import { IFiltersPopupProps } from "@/types/catalog";
import FiltersPopUpTop from "./FiltersPopUpTop";
import FilterManufacturerAccardion from "./FilterManufacturerAccardion";


const FiltersPopup = ({
    resetFilterBtnDisabled,
    resetAllManufacturers,
    handleClosePopup,
    updateManufacturer,
    setManufacturer,
    applyFilters,
    openPopup,
    title,
    manufacturersList,

}: IFiltersPopupProps
) => {

    const mode = useStore($mode);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;
    console.log(openPopup)


    return (
        <div className={`${styles.filters__popup} ${darkModeClass} ${openPopup? styles.open : ''}`}>
            <div className={styles.filters__popup__inner}>
                <FiltersPopUpTop 
                resetBtnText="Сбросить" 
                title={title as string} 
                resetFilterBtnDisabled={resetFilterBtnDisabled}
                resetFilters={resetAllManufacturers}
                ClosePopup={handleClosePopup}
                />
                <FilterManufacturerAccardion
                manufacturersList={manufacturersList}
                updateManufacturer={updateManufacturer}
                setManufacturer={setManufacturer}
                title={false}
                />
            </div>
            <div className={styles.filters__actions}>
                <button 
                className={styles.filters__actions__show} 
                disabled={resetFilterBtnDisabled}
                onClick={applyFilters}
                style={{marginBottom:12}}
                >
                Показать
                </button>
                <button 
                className={styles.filters__actions__reset} 
                onClick={handleClosePopup}
                >
                Назад
                </button>
            </div>
        </div>

    )
}

export default FiltersPopup;

