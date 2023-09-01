import { toast } from 'react-toastify';
import { HTTPStatus } from "@/constants";
import { AxiosError } from "axios"

export const showAuthError = (error: unknown) => {
    const axiosError = error as AxiosError;

    if(axiosError.response){
        if(axiosError.response.status === HTTPStatus.UNATHORIZED){
            toast.error('Неверное имя пользователя или пароль');
            return
        }
    }

    toast.error((error as Error).message);
}