import { idGenerator } from "./common";

const createManufacturerCheckBoxObj = (title:string) => ({
    title,
    checked: false,
    id: idGenerator(),

})

export const boilerManufacturers = [
    'Ariston',
    'Chaffoteaux&Maury',
    'Baxi',
    'Bongioanni',
    'Saunier Duval',
    'Buderus',
    'Strategist',
    'Henry',
    'Northwest',
  ].map(createManufacturerCheckBoxObj)
  export const partsManufacturers = [
    'Azure',
    'Gloves',
    'Cambridgeshire',
    'Salmon',
    'Montana',
    'Sensor',
    'Lesly',
    'Radian',
    'Gasoline',
    'Croatia',
  ].map(createManufacturerCheckBoxObj)
  