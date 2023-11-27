import { $mode } from "@/context/mode";
import { useStore } from "effector-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IFilterManufacturerAccardionProps } from "@/types/catalog";
import Accordion from "@/components/elements/Accordion/Accordion";
import FilterCheckboxItem from "./FilterCheckboxItem";
import styles from '@/styles/Catalog/index.module.scss';





const FilterManufacturerAccardion = ({manufacturersList,title,setManufacturer,updateManufacturer}: IFilterManufacturerAccardionProps) => {
    const mode = useStore($mode);
    const isMobile = useMediaQuery(820);
    const chooseAllManufacturers = () => setManufacturer(
        manufacturersList.map((item) => ({...item, checked: true}))
        );
    
    const darkModeClass = mode === 'dark'? `${styles.dark_mode}` : ``;
    return(
       <Accordion
            title={title}
            titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`} 
            arrowOpenClass={styles.open}
            isMobileForFilters={isMobile}
            hideArrowClass={isMobile? styles.hide_arrow : ''}       
        >
            <div className={styles.filters__manufacturer__inner}>
                <button
                className={styles.filters__manufacturer__select_all}
                onClick={chooseAllManufacturers}
                >
                Выбрать все
                </button>
                <ul>
                {manufacturersList.map((item) => <FilterCheckboxItem 
                title={item.title} 
                key={item.id}
                id={item.id}
                checked={item.checked} 
                event={updateManufacturer} /> )}
                </ul>
                <div style={{height:24 }}/>
            </div>
        </Accordion>

    

    )
}        

export default FilterManufacturerAccardion;