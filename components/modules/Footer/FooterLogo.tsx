/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from '@/styles/Footer/index.module.scss';


const FooterLogo = () => {
    return(
        <div className={styles.footer__top__item}>
           <Link href={'/dashboard'} legacyBehavior passHref>
           <a className={styles.footer__top__item__logo}>
                <img src="/img/footLogo.svg" alt="logo" />
                <span className={styles.footer__top__item__text}>Детали для газовых котлов</span>
            </a>
           </Link>
        </div>
    )
}

export default FooterLogo;