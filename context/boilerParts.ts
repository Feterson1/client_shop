import { IBoilerParts } from "@/types/boilerParts";
import { IFilterCheckBoxItem } from "@/types/catalog";
import { boilerManufacturers, partsManufacturers } from "@/utils/catalog";
import { createDomain } from "effector-next";

const boilerParts = createDomain();


export const setBoilerParts = boilerParts.createEvent<IBoilerParts>();
export const setBoilerPartsCheapFirst = boilerParts.createEvent<IBoilerParts>();
export const setFileredBoilerParts = boilerParts.createEvent<IBoilerParts>();
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent<IBoilerParts>();
export const setBoilerPartsByPopularity = boilerParts.createEvent<IBoilerParts>();
export const setBoilerManufacturers = boilerParts.createEvent<IFilterCheckBoxItem[]>();
export const setPartsManufacturers = boilerParts.createEvent<IFilterCheckBoxItem[]>();
export const updateBoilerManufacturers = boilerParts.createEvent<IFilterCheckBoxItem>();
export const updatePartsManufacturers = boilerParts.createEvent<IFilterCheckBoxItem>();
export const setBoilerManufacturersFromQuery = boilerParts.createEvent<string[]>();
export const setPartsManufacturersFromQuery = boilerParts.createEvent<string[]>();

const updateManufacturer = (
    manufacturers: IFilterCheckBoxItem[],
     id:string,
      payload: Partial<IFilterCheckBoxItem>
      ) => manufacturers.map((item) => {
        if(item.id === id){
            return {
                ...item,
                ...payload,
            }
        }
        return item;
      })

      const updateManufacturerFromQuery = (
        manufacturers: IFilterCheckBoxItem[],
         manufacturersFromQuery: string[],
          ) => manufacturers.map((item) => {
            if(manufacturersFromQuery.find((title) => title === item.title)){
                return {
                    ...item,
                   checked:true,
                }
            }
            return item;
          })

export const $boilerParts = boilerParts.createStore<IBoilerParts>({} as IBoilerParts)
.on(setBoilerParts,(_,parts) => parts)
.on(setBoilerPartsCheapFirst,(state) => ({
    ...state,
    rows:state.rows.sort((a,b) => a.price - b.price),
}))
.on(setBoilerPartsExpensiveFirst,(state) => ({
    ...state,
    rows:state.rows.sort((a,b) => b.price - a.price),
}))
.on(setBoilerPartsByPopularity,(state) => ({
    ...state,
    rows:state.rows.sort((a,b) => b.popularity - a.popularity),
}))



export const $boilerManufacturers = boilerParts.createStore<IFilterCheckBoxItem[]>(boilerManufacturers as IFilterCheckBoxItem[] )
.on(setBoilerManufacturers,(_,parts) => parts)
.on(updateBoilerManufacturers,(state,payload) => [
    ...updateManufacturer(state,payload.id as string, {checked: payload.checked}),
])
.on(setBoilerManufacturersFromQuery,(state,manufacturersFromQuery) => [...updateManufacturerFromQuery(state,manufacturersFromQuery)])

export const $partsManufacturers = boilerParts.createStore<IFilterCheckBoxItem[]>(partsManufacturers as IFilterCheckBoxItem[])
.on(setPartsManufacturers,(_,parts) => parts)
.on(updatePartsManufacturers,(state,payload) => [
    ...updateManufacturer(state,payload.id as string, {checked: payload.checked}),
])
.on(setPartsManufacturersFromQuery,(state,manufacturersFromQuery) => [...updateManufacturerFromQuery(state,manufacturersFromQuery)])

export const $filteredBoilerParts = boilerParts.createStore<IBoilerParts>({} as IBoilerParts)
.on(setFileredBoilerParts,(_,parts) => parts)


