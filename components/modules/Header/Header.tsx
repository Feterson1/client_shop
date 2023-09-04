import styles from '@/styles/Header/index.module.scss';
import HeaderTop from './HeaderTop';


const Header = () => {
    return (
        <header className={styles.header}>
            <HeaderTop/>

        </header>

    )
}

export default Header;