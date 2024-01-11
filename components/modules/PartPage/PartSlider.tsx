/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from '@/styles/Part/index.module.scss';

const PartSlider = ({images} : {images: string[]}) => {
   
  
    const  isMobile700 = useMediaQuery(700);
    const  isMobile530 = useMediaQuery(530);
    const settings = {
        dots: false,
        infinite: true,
        slidesToScroll: 1,
        autoplay: true,
        variableWidth: true,
        speed: 300,
        arrows: false,
        slideToScroll: 1 ,
      };
   
    return (
       <Slider {...settings} className={styles.part__slider}>
        {images.map((src,id) => (
            <div className={styles.part__slide} key={id} style={{width:isMobile530? 228 : isMobile700? 350 : 593}} >
                <img src={src} alt={`image-${id + 1}`} />
            </div>
        ))}
       </Slider>
    )
}

export default PartSlider;