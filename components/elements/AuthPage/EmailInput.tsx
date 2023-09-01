import styles from '@/styles/Auth/index.module.scss';
import { IAuthPageInput } from '@/types/auth';




const EmailInput = ({register,errors}: IAuthPageInput) => {
    return (
        <label className={styles.form__label}>
        <input {...register('email',{
            required: 'Введите Email',
            pattern: {
                value:/\S+@\S+\.\S+/,
                message: 'Неправильный Email',
            }
        })} className={styles.form__input} type="email" placeholder="email"/>
        {errors.email && (<span className={styles.error_alert}>{errors.email?.message}</span>)}
        </label>

    )
}

export default EmailInput;