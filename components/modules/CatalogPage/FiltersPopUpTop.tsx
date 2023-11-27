import { $mode } from "@/context/mode";

import { useStore } from "effector-react";
import styles from '@/styles/Catalog/index.module.scss';
import { IFiltersPopUpTop } from "@/types/catalog";



const FiltersPopUpTop = ({title,resetBtnText,resetFilters,resetFilterBtnDisabled,ClosePopup}:IFiltersPopUpTop) => {
    const mode = useStore($mode);
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;

    return(
        <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
            <button 
            onClick={ClosePopup} 
            className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}>
                {title}
            </button>
            <button 
            onClick={resetFilters} 
            className={styles.catalog__bottom__filters__reset} 
            disabled={resetFilterBtnDisabled}>
                {resetBtnText}
            </button>
        </div>

    )


}

export default FiltersPopUpTop;