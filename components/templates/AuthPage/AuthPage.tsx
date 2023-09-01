import { MutableRefObject, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/Auth/index.module.scss';
import SignUpForm from '@/components/modules/AuthPage/SignUpForm';



const AuthPage = () => {

  const isMedia800 = useMediaQuery(800);
  const switchCtn = useRef() as MutableRefObject<HTMLDivElement>;
  const switchC1 = useRef() as MutableRefObject<HTMLDivElement>;
  const switchC2 = useRef() as MutableRefObject<HTMLDivElement>;
  const switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>;
  const switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>;
  const aContainer = useRef() as MutableRefObject<HTMLDivElement>;
  const bContainer = useRef() as MutableRefObject<HTMLDivElement>;


  const switchForm = () => {
    switchCtn.current.classList.add(styles.is_gs);
      setTimeout( () => {
          switchCtn.current.classList.remove(styles.is_gx);
      }, 1500)

      switchCtn.current.classList.toggle(styles.is_txr);
      switchCircle1.current.classList.toggle(styles.is_txr);
      switchCircle2.current.classList.toggle(styles.is_txr);

      switchC1.current.classList.toggle(styles.is_hidden);
      switchC2.current.classList.toggle(styles.is_hidden);
      aContainer.current.classList.toggle(styles.is_txl);
      bContainer.current.classList.toggle(styles.is_txl);
      bContainer.current.classList.toggle(styles.is_z200);
}


    return (
        <div className={styles.main}>
      <div className={`${styles.container} ${styles.a_container}`} id='a_container' ref={aContainer}>
        <div className={styles.container__inner}>
        <SignUpForm switchForm={switchForm}/>
        </div>
       
      </div>
      <div className={`${styles.container} ${styles.b_container}`} id="b-container" ref={bContainer}>
        <div className={styles.container__inner}>
        <form className={styles.form}>
          <h2 className={`${styles.form__title} ${styles.title}`}>Sign in to Website</h2>
          <input className={styles.form__input} type="text" placeholder="Email"/>
          <input className={styles.form__input} type="password" placeholder="Password"/>
          <button onClick={switchForm} className={`${styles.form__button} ${styles.button} ${styles.submit}`}>SIGN IN</button>
        </form>
        </div>
      </div>
      <div className={styles.switch} id="switch-cnt" ref={switchCtn}>
        <div className={styles.switch__circle} ref={switchCircle1}></div>
        <div className={`${styles.switch__circle} ${styles.switch__circle__t}`} ref={switchCircle2}></div>
        <div className={styles.switch__container} id="switch-c1" ref={switchC1}>
          {!isMedia800 && (
             <>
             <h2 className={`${styles.switch__title} ${styles.title}`}>Добро пожаловать!</h2>
             <p className={`${styles.switch__description} ${styles.description}`}>
              Чтобы оставаться на связи с нами, пожалуйста , ввойдите под своей личной информацией
              </p>
             </>
          )}
          <button onClick={switchForm}  className={`${styles.switch__button} ${styles.button} ${styles.switch_btn}`}>SIGN IN</button>
        </div>
        <div className={`${styles.switch__container} ${styles.is_hidden}`} id="switch-c2" ref={switchC2}>
         {!isMedia800 && (
          <>
          <h2 className={`${styles.switch__title} ${styles.title}`}>Привет друг !</h2>
          <p className={`${styles.switch__description} ${styles.description}`}>Введите свои личные данные и начните путешествие с нами</p>
          </>
         )}
          <button className={`${styles.switch__button} ${styles.button} ${styles.switch_btn}`}>SIGN UP</button>
        </div>
      </div>
    </div>
    )
}

export default AuthPage;