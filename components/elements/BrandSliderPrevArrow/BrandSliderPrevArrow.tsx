import { IBrandSliderArrow } from "@/types/elements";
import BrandSliderArrowSvg from "../BrandSlideArrow/BrandSlideArrow";
import styles from '@/styles/Dashboard/index.module.scss';

const BrandSliderPrevArrow = (props: IBrandSliderArrow) => {
    return(
        <button 
        className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
        onClick={props.onClick}
        >
            <span><BrandSliderArrowSvg/></span>
        </button>

    )
}

export default BrandSliderPrevArrow;