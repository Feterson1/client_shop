import { ISignInFx, ISignUpFx } from "@/types/auth";
import { createEffect } from "effector-next";
import api from "../axiosClient";
import { toast } from "react-toastify";

export const signUpFx = createEffect(async ({url,username,password,email}: ISignUpFx) => {

    const {data} = await api.post(url,{username,password,email});

    if(data.warningMessage){
        toast.warning(data.warningMessage);
        return
    }

    toast.success('Регистрация прошла успешно');
    return data;

});

export const signInFx = createEffect(async ({url,username,password}: ISignInFx) => {

    const {data} = await api.post(url,{username,password});

    if(data.warningMessage){
        toast.warning(data.warningMessage);
        return
    }

    toast.success('Вход выполнен')
    return data;

});