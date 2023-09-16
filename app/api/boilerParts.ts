import { createEffect } from "effector-next";
import api from "../axiosClient";


const getBetsellerOrNewPartsFx = createEffect(async(url: string) => {
    const {data} = await api.get(url);

    return data;
})

export default getBetsellerOrNewPartsFx;