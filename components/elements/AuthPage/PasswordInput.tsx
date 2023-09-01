import styles from '@/styles/Auth/index.module.scss';
import { IAuthPageInput } from '@/types/auth';




const PasswordInput = ({register,errors}: IAuthPageInput) => {
    return (
        <label className={styles.form__label}>
        <input {...register('password',{
            required: 'Введите пароль',
            minLength: 4,
            maxLength: 20,
        })} className={styles.form__input} type="password" placeholder="password"/>
        {errors.password && (<span className={styles.error_alert}>{errors.password?.message}</span>)}

        {errors.password && errors.password.type === "minLength" && (<span className={styles.error_alert}>Минимум 4 символа!</span>)}

        {errors.password && errors.password.type === 'maxLength' && (<span className={styles.error_alert}>Не более 20 символов!</span>)}
        </label>

    )
}

export default PasswordInput;