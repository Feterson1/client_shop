import { signUpFx } from '@/app/api/auth';
import EmailInput from '@/components/elements/AuthPage/EmailInput';
import NameInput from '@/components/elements/AuthPage/NameInput';
import PasswordInput from '@/components/elements/AuthPage/PasswordInput';
import styles from '@/styles/Auth/index.module.scss';
import spinnerStyles from '@/styles/spinner/index.module.scss';
import { IInputs } from '@/types/auth';
import { showAuthError } from '@/utils/errors';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



const SignUpForm = ({switchForm} : {switchForm: () => void}) => {
  const [spinner,setSpinner] = useState(false);
    const {
      register,
      formState: {errors},
      handleSubmit,
      resetField     } = useForm<IInputs>();
    const onSubmit = async (data: IInputs) => {
        try{
          setSpinner(true);

          const userData = await signUpFx({
            url:'/users/signup',
            username: data.name,
            email: data.email,
            password: data.password,

          });
          
       if(!userData){
        return
       }
          
        resetField('name');
        resetField('email');
        resetField('password');
        switchForm()
        }catch(error){

          showAuthError(error);

          toast.error((error as Error).message)

        }finally{
          setSpinner(false);
        }

    }
    return (
    <>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={`${styles.form__title} ${styles.title}`}>Создать аккаунт</h2>
          <NameInput register={register} errors={errors}/>
          <EmailInput register={register} errors={errors}/>
        <PasswordInput register={register} errors={errors}/>
        <button className={`${styles.form__button} ${styles.button} ${styles.submit}`}>
            {spinner? (<div className={spinnerStyles.spinner}/>) : ('Зарегистрироваться')}
            </button>
        </form>
    
    </>
    )
}

export default SignUpForm;