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


export interface ICatalogFiltersProps extends ICatalogBaseTypes,ICatalogFiltersBaseTypes {
    isPriceRangeChanged: boolean
    currentPage: number
    setIsFilterInQuery: (arg0:boolean) => void
    ClosePopup: VoidFunction
    filtersMobileOpen: boolean
}

export type IPriceRangeProps = ICatalogBaseTypes

interface ICatalogBaseTypes {
    priceRange: number[]
    setPriceRange: (arg0: number[]) => void
    setIsPriceRangeChanged: (arg0: boolean) => void
   

}
interface ICatalogFiltersBaseTypes {
    resetFilterBtnDisabled: boolean
    resetFilters: VoidFunction
}

export interface ICatalogFiltersDesktopProps extends ICatalogBaseTypes,ICatalogFiltersBaseTypes{
    spinner: boolean
    applyFilters: VoidFunction

}

export interface ICatalogFiltersMobileProps extends ICatalogBaseTypes,ICatalogFiltersBaseTypes{
    spinner: boolean
    applyFilters: VoidFunction
    ClosePopup: VoidFunction
    filtersMobileOpen: boolean
}

export interface IFiltersPopUpTop {
    resetBtnText: string
    title: string
    resetFilters: VoidFunction
    resetFilterBtnDisabled: boolean
    ClosePopup: VoidFunction

}

export interface IFiltersPopupProps extends IFilterManufacturerAccardionProps {

    resetFilterBtnDisabled:boolean
    resetAllManufacturers: VoidFunction
    handleClosePopup: VoidFunction
    applyFilters: VoidFunction
    openPopup:boolean
}