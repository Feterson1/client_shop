import { IBoilerPart } from "./boilerParts";

export interface IDashboardSlider {
    items: IBoilerPart[]
    spinner: boolean
    goToPartPage: boolean
}