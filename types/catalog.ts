import {Event} from 'effector-next';

export interface IManufacturersBlockProps {
    title: string
    manufacturersList: IFilterCheckBoxItem[]
    event: Event<IFilterCheckBoxItem>
}

export interface IManufacturersBlockItemProps{
    item: IFilterCheckBoxItem
    event: Event<IFilterCheckBoxItem>

}

export interface IQueryParams {
    offset: string
    first: string
    boiler: string
    parts: string
    priceFrom: string
    priceTo: string
} 


export interface IFilterCheckBoxItem{
    title: string
    checked: boolean
    id?: string
    event: Event<IFilterCheckBoxItem>
}

export interface IFilterManufacturerAccardionProps{
    manufacturersList: IFilterCheckBoxItem[]
    title: string | false
    setManufacturer: Event<IFilterCheckBoxItem[]>
    updateManufacturer: Event<IFilterCheckBoxItem>
}


export interface ICatalogFiltersProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (arg0:boolean) => void
}

export interface IPriceRangeProps{
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void

}


export interface ICatalogFiltersDesktopProps {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
    spinner: boolean
    applyFilters: VoidFunction

}
