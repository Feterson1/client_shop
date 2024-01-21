import { signUpFx } from '@/app/api/auth'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import AuthNameInput from '@/components/elements/AuthPage/AuthNameInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { $mode } from '@/context/mode'
import styles from '@/styles/Auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { IInputs } from '@/types/auth'
import { showAuthError } from '@/utils/errors'
import { useStore } from 'effector-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const [spinner, setSpinner] = useState(false)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ``

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()
  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)

      const userData = await signUpFx({
        url: '/users/signup',
        username: data.name,
        email: data.email,
        password: data.password,
      })

      if (!userData) {
        return
      }

      resetField('name')
      resetField('email')
      resetField('password')
      switchForm()
    } catch (error) {
      showAuthError(error)

      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
  return (
    <>
      <form
        className={`${styles.form} ${darkModeClass}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2
          className={`${styles.form__title} ${styles.title} ${darkModeClass}`}
        >
          Создать аккаунт
        </h2>
        <AuthNameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <button
          className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
        >
          {spinner ? (
            <div className={spinnerStyles.spinner} />
          ) : (
            'Зарегистрироваться'
          )}
        </button>
      </form>
    </>
  )
}

export default SignUpForm
