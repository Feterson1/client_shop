import { createDomain } from "effector-next";

const mode = createDomain();

export const setMode = mode.createEvent<string>()

export const $mode = mode.createStore('light').on(setMode,(_,mode) => mode);