import { createDomain } from 'effector-next'

const header = createDomain()

export const setSearchInputZIndex = header.createEvent<number>()

export const $setSearchInputZIndex = header
  .createStore<number>(1)
  .on(setSearchInputZIndex, (_, header) => header)
