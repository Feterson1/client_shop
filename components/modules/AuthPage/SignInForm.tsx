import { signInFx } from '@/app/api/auth';
import NameInput from '@/components/elements/AuthPage/NameInput';
import PasswordInput from '@/components/elements/AuthPage/PasswordInput';
import styles from '@/styles/Auth/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { IInputs } from '@/types/auth';
import { showAuthError } from '@/utils/errors';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const SignInForm = () => {

    const [spinner,setSpinner] = useState(false);

    const {
        register,
        formState: {errors},
        handleSubmit,
        resetField,

    } = useForm<IInputs>();

    const onSubmit = async (data: IInputs) => {

        try {
            setSpinner(true);
            await signInFx({
                url: '/users/login',
                username: data.name,
                password: data.password,
            });
         

            resetField('name');
            resetField('password');
            
            
        } catch (error) {
            showAuthError(error);

            toast.error((error as Error).message);
            
        }finally{
            setSpinner(false);
        }


    }

    return (
       <>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h2 className={`${styles.form__title} ${styles.title}`}>Войти на сайт</h2>
          <NameInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
          <button className={`${styles.form__button} ${styles.button} ${styles.submit}`}>
            {spinner? (<div className={spinnerStyles.spinner}/>) : ('Войти')}
            </button>
        </form>
       </>
    )

}

export default SignInForm;