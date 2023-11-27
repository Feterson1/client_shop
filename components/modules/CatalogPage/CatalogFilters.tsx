import { useMediaQuery } from "@/hooks/useMediaQuery";
import CatalogFiltersDesktop from "./CatalogFiltersDesktop";
import { ICatalogFiltersProps } from "@/types/catalog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "effector-react";
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturersFromQuery,setPartsManufacturersFromQuery } from "@/context/boilerParts";
import { useRouter } from "next/router";
import CatalogFiltersMobile from "./CatalogFiltersMobile";
import { checkQueryParams, updateParamsAndFilter, updateParamsAndFilterFromQuery } from "@/utils/catalog";
import { getQueryParamOnFirstRender } from "@/utils/common";

const CatalogFilters = ({
    priceRange,
    setPriceRange,
    setIsPriceRangeChanged,
    resetFilterBtnDisabled,
    resetFilters,
    isPriceRangeChanged,
    currentPage,
    setIsFilterInQuery,
    ClosePopup,
    filtersMobileOpen
}: ICatalogFiltersProps) => {


    const isMobile = useMediaQuery(820);
    const [spinner,setSpinner] = useState(false);
    const boilerManufacturers = useStore($boilerManufacturers);
    const partsManufacturers = useStore($partsManufacturers);
    const router = useRouter();

    useEffect(()=>{
        applyFiltersFromQuery();

    },[])


   

    const applyFiltersFromQuery = async () => {
    try {

        const {
            isValidBoilerQuery,
            isValidPartsQuery,
            isValidPriceQuery,
            priceFromQueryValue,
            priceToQueryValue,
            boilerQueryValue,
            partsQueryValue
        } = checkQueryParams(router);

       
        const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler',router)}`;
        const partsQuery = `&parts=${getQueryParamOnFirstRender('parts',router)}`;
        const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;

        if(isValidBoilerQuery && isValidPartsQuery && isValidPriceQuery){
            
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                setBoilerManufacturersFromQuery(boilerQueryValue);
                setPartsManufacturersFromQuery(partsQueryValue);
            },`${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
            return
        }
        if(isValidPriceQuery){
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                
            },`${currentPage}${priceQuery}`)
            return
        }
        if(isValidBoilerQuery && isValidPartsQuery){
            updateParamsAndFilterFromQuery(() => {
                setIsFilterInQuery(true);
                setBoilerManufacturersFromQuery(boilerQueryValue);
                setPartsManufacturersFromQuery(partsQueryValue);

            },`${currentPage}${boilerQuery}${partsQuery}`)
            return
        }
        if(isValidBoilerQuery ){
            updateParamsAndFilterFromQuery(() => {
                setIsFilterInQuery(true);
                setBoilerManufacturersFromQuery(boilerQueryValue);
               

            },`${currentPage}${boilerQuery}`)
     
        }
        if(isValidPartsQuery){
            updateParamsAndFilterFromQuery(() => {
                setIsFilterInQuery(true);
                setPartsManufacturersFromQuery(partsQueryValue);

            },`${currentPage}${partsQuery}`)
          
        }
        if(isValidBoilerQuery && isValidPriceQuery){
            
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                setBoilerManufacturersFromQuery(boilerQueryValue);
               
            },`${currentPage}${priceQuery}${boilerQuery}`)
            return
        }
        if( isValidPartsQuery && isValidPriceQuery){
            
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                setBoilerManufacturersFromQuery(boilerQueryValue);
                setPartsManufacturersFromQuery(partsQueryValue);
            },`${currentPage}${priceQuery}${partsQuery}`)
            return
        }

    } catch (error) {
        const err = error as Error;
        if(err.message === 'URI malformed'){
            toast.warning('Неправильный url для фильтров');
            return
        }

        toast.error(err.message);
    }

    }
    const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
        setIsFilterInQuery(true);
        setPriceRange([+priceFrom,+priceTo]);
        setIsPriceRangeChanged(true);
    }

  
    const applyFilters = async () => {
        setIsFilterInQuery(true);
        try {
            setSpinner(true);
            const priceFrom = Math.ceil(priceRange[0]);
            const priceTo = Math.ceil(priceRange[1]);
            const priceQuery = isPriceRangeChanged? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : '';
            const boilers = boilerManufacturers.filter((item) => item.checked).map((item) => item.title);
            const parts = partsManufacturers.filter((item) => item.checked).map((item) => item.title);
            const encodedBoilerQuery = encodeURIComponent(JSON.stringify(boilers));
            const encodedPartsQuery = encodeURIComponent(JSON.stringify(parts));
            const boilerQuery = `&boiler=${encodedBoilerQuery}`;
            const partsQuery = `&parts=${encodedPartsQuery}`;
            const initialPage = currentPage > 0? 0 : currentPage;

            if(boilers.length && parts.length && isPriceRangeChanged){
                updateParamsAndFilter({
                    boiler: encodedBoilerQuery,
                    parts: encodedPartsQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,

                },`${initialPage}${boilerQuery}${partsQuery}${priceQuery}`,router);
                return
            }
            if(isPriceRangeChanged){
                updateParamsAndFilter({ 
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,
                },`${initialPage}${priceQuery}`,router);

                return


            }

            if(boilers.length && parts.length ){
                updateParamsAndFilter({
                    boiler: encodedBoilerQuery,
                        parts: encodedPartsQuery,
                        offset: initialPage + 1,
                },`${initialPage}${boilerQuery}${partsQuery}`,router); 
               
                return
            }

            if(boilers.length){
                updateParamsAndFilter({
                    boiler: encodedBoilerQuery,
                    offset: initialPage + 1,
                },`${initialPage}${boilerQuery}`,router);
                
                return
            }
            if(parts.length ){
                updateParamsAndFilter({
                    parts: encodedPartsQuery,
                    offset: initialPage + 1,
                },`${initialPage}${partsQuery}`,router)
                
                return
            }
            if(boilers.length && isPriceRangeChanged){
                updateParamsAndFilter({ 
                    boiler: encodedBoilerQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,
                },`${initialPage}${boilerQuery}${priceQuery}`,router)
              
                return
            }
            if(parts.length && isPriceRangeChanged){
                updateParamsAndFilter({
                    parts: encodedPartsQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,
                },`${initialPage}${partsQuery}${priceQuery}`,router)
               
                return
            }
            
        } catch (error) {
            toast.error((error as Error).message)
            
        }
        finally{
            setSpinner(false);
        }
    }

    return(
        <>
        {isMobile? 
        <CatalogFiltersMobile 
        ClosePopup={ClosePopup}
        spinner={spinner}
        applyFilters={applyFilters}
        priceRange={priceRange}
        setIsPriceRangeChanged={setIsPriceRangeChanged}
        resetFilters={resetFilters}
        resetFilterBtnDisabled={resetFilterBtnDisabled}
        setPriceRange={setPriceRange}
        filtersMobileOpen={filtersMobileOpen}
        /> 
        : 
        <CatalogFiltersDesktop 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
        setIsPriceRangeChanged={setIsPriceRangeChanged}
        resetFilterBtnDisabled={resetFilterBtnDisabled}
        spinner={spinner}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        />}
        </>

    )
}

export default CatalogFilters;