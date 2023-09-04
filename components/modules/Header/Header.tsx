import styles from '@/styles/Header/index.module.scss';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';


const Header = () => {
    return (
        <header className={styles.header}>
            <HeaderTop/>
            <HeaderBottom/>

        </header>

    )
}

export default Header;