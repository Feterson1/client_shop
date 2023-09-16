import { IBrandSliderArrow } from "@/types/elements";
import BrandSliderArrowSvg from "../BrandSlideArrow/BrandSlideArrow";
import styles from '@/styles/Dashboard/index.module.scss';

const BrandSliderNextArrow = (props: IBrandSliderArrow) => {
    return(
        <button 
        className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_next} ${props.modeClass}`}
        onClick={props.onClick}
        >
            <span><BrandSliderArrowSvg/></span>
        </button>

    )
}

export default BrandSliderNextArrow;