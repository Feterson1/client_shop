import { signUpFx } from '@/app/api/auth';
import EmailInput from '@/components/elements/AuthPage/EmailInput';
import NameInput from '@/components/elements/AuthPage/NameInput';
import PasswordInput from '@/components/elements/AuthPage/PasswordInput';
import styles from '@/styles/Auth/index.module.scss';
import { IInputs } from '@/types/auth';
import { error } from 'console';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



const SignUpForm = ({switchForm} : {switchForm: () => void}) => {
    const {
      register,
      formState: {errors},
      handleSubmit,
      resetField     } = useForm<IInputs>();
    const onSubmit = async (data: IInputs) => {
        try{

          const userData = await signUpFx({
            url:'/users/signup',
            username: data.name,
            email: data.email,
            password: data.password,

          });
          
          console.log(userData);
          
        resetField('name');
        resetField('email');
        resetField('password');
        switchForm()
        }catch(error){

          toast.error((error as Error).message)

        }

    }
    return (
    <>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className={`${styles.form__title} ${styles.title}`}>Создать аккаунт</h2>
          <NameInput register={register} errors={errors}/>
          <EmailInput register={register} errors={errors}/>
        <PasswordInput register={register} errors={errors}/>
          <button className={`${styles.form__button} ${styles.button} ${styles.submit}`}>SIGN UP</button>
        </form>
    
    </>
    )
}

export default SignUpForm;