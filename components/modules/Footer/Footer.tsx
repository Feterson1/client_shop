import styles from '@/styles/Footer/index.module.scss';
import FooterLogo from './FooterLogo';
import OnlineStoreContent from './OnlineStoreContent';
import CompanyContent from './CompanyContent';
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg';
import Link from 'next/link';
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg';
import MailSvg from '@/components/elements/MailSvg/MailSvg';


const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__top}>
                <FooterLogo/>
                <div className={styles.footer__inner}>
                    <div className={styles.footer__top__item}>
                        <h3 className={styles.footer__top__item__title}>
                            Интернет-магазин
                        </h3>
                        <OnlineStoreContent/>
                    </div>
                    <div className={styles.footer__top__item}>
                        <h3 className={styles.footer__top__item__title}>
                            Компания
                        </h3>
                        <CompanyContent/>
                    </div>
                    <div className={styles.footer__top__item}>
                        <h3 className={styles.footer__top__item__title}>
                            Контакты
                        </h3>
                        <ul className={`${styles.footer__top__item_list} ${styles.footer__top__item__contacts}`}>
                            <li>
                               <Link href={'/contacts'} legacyBehavior passHref>
                               <a className={styles.footer__top__item_list__item__link}>
                                    <span>Наш адрес:</span>
                                    <span>г. Москва, ул. ... д...</span>
                                    <span><MarkerSvg/></span>
                                </a>
                                </Link>
                            </li>
                            <li>
                               <a href='tel:+780955555555' className={styles.footer__top__item_list__item__link}>
                                    <span>Наш контактный телефон:</span>
                                    <span>+7(8095) 555-55-55</span>
                                    <span><PhoneSvg/></span>
                                </a>
                            </li>
                            <li>
                               <a href='mailto:info@zapchasti.com.ru' className={styles.footer__top__item_list__item__link}>
                                    <span>E-mail:</span>
                                    <span>info@zapchasti.com.ru</span>
                                    <span><MailSvg/></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                </div>
                <div className={styles.footer__bottom}>
                    
                </div>

            </div>

        </footer>

    )
}

export default Footer;