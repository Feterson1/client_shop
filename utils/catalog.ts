import { NextRouter } from "next/router";
import { idGenerator } from "./common";
import { getQueryParamOnFirstRender } from "@/utils/common";
import { setFileredBoilerParts } from "@/context/boilerParts";
import { getBoilerPartsFx } from "@/app/api/boilerParts";

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

const checkPriceFromQuery = (price:number) => price && isNaN(price) && price >=0 && price <= 10000



export const checkQueryParams = (router: NextRouter) => { 
  const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom',router) as string;
  const priceToQueryValue = getQueryParamOnFirstRender('priceTo',router)  as string;
  const boilerQueryValue = JSON.parse(
      decodeURIComponent(
          getQueryParamOnFirstRender('boiler',router) as string
      )
          );
  const partsQueryValue = JSON.parse(
              decodeURIComponent(
                  getQueryParamOnFirstRender('parts',router) as string
              )
                  );

  const isValidPriceQuery = checkPriceFromQuery(+priceFromQueryValue) && checkPriceFromQuery(+priceToQueryValue); 
  const isValidBoilerQuery = Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length;
  const isValidPartsQuery = Array.isArray(partsQueryValue) && !!partsQueryValue?.length;
                  
 

  return {
    isValidBoilerQuery,
    isValidPartsQuery,
    isValidPriceQuery,
    boilerQueryValue,
    partsQueryValue,
    priceFromQueryValue,
    priceToQueryValue,
  }
}


export const updateParamsAndFilterFromQuery = async (
  callBack: VoidFunction, 
  path:string,
  ) => {
  callBack();

  const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`);

  setFileredBoilerParts(data);

}
export async function updateParamsAndFilter<T>(updatedParams: T, path: string, router: NextRouter,) {

  const params = router.query;
  delete params.boiler;
  delete params.parts;
  delete params.priceFrom;
  delete params.priceTo; 
  params.first = 'cheap';
  
      router.push({
          query: {
              ...router.query,
              ...updatedParams,
          }
      },undefined,{shallow: true}
      );
      const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`);

      setFileredBoilerParts(data);
      return
  
  
}

