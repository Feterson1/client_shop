import { useMediaQuery } from "@/hooks/useMediaQuery";
import CatalogFiltersDesktop from "./CatalogFiltersDesktop";
import { ICatalogFiltersProps } from "@/types/catalog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "effector-react";
import { $boilerManufacturers, $partsManufacturers, setBoilerManufacturersFromQuery, setFileredBoilerParts, setPartsManufacturersFromQuery } from "@/context/boilerParts";
import { useRouter } from "next/router";
import { getBoilerPartsFx } from "@/app/api/boilerParts";
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
        const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom',router);
        const priceToQueryValue = getQueryParamOnFirstRender('priceTo',router);
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

        const isValidBoilerQuery = Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length;
        const isValidPartsQuery = Array.isArray(partsQueryValue) && !!partsQueryValue?.length;
                        
        const boilerQuery = `&boiler=${getQueryParamOnFirstRender('boiler',router)}`;
        const partsQuery = `&parts=${getQueryParamOnFirstRender('parts',router)}`;

        const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`;

        if(isValidBoilerQuery && isValidPartsQuery && priceFromQueryValue && priceToQueryValue){
            
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                setBoilerManufacturersFromQuery(boilerQueryValue);
                setPartsManufacturersFromQuery(partsQueryValue);
            },`${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
            return
        }
        if(priceFromQueryValue && priceToQueryValue){
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
        if(isValidBoilerQuery && priceFromQueryValue && priceToQueryValue){
            
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                setBoilerManufacturersFromQuery(boilerQueryValue);
               
            },`${currentPage}${priceQuery}${boilerQuery}`)
            return
        }
        if( isValidPartsQuery && priceFromQueryValue && priceToQueryValue){
            
            updateParamsAndFilterFromQuery(() => {
                updatePriceFromQuery(+priceFromQueryValue,+priceToQueryValue);
                setBoilerManufacturersFromQuery(boilerQueryValue);
                setPartsManufacturersFromQuery(partsQueryValue);
            },`${currentPage}${priceQuery}${partsQuery}`)
            return
        }

    } catch (error) {
        toast.error((error as Error).message);
    }

    }
    const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
        setIsFilterInQuery(true);
        setPriceRange([+priceFrom,+priceTo]);
        setIsPriceRangeChanged(true);
    }

    const updateParamsAndFilterFromQuery = async (callBack: VoidFunction, path:string) => {
        callBack();

        const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`);

        setFileredBoilerParts(data);

    }
    async function updateParamsAndFilter<T>(updatedParams: T, path: string) {

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

                },`${initialPage}${boilerQuery}${partsQuery}${priceQuery}`);
                return
            }
            if(isPriceRangeChanged){
                updateParamsAndFilter({ 
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,
                },`${initialPage}${priceQuery}`);

                return


            }

            if(boilers.length && parts.length ){
                updateParamsAndFilter({
                    boiler: encodedBoilerQuery,
                        parts: encodedPartsQuery,
                        offset: initialPage + 1,
                },`${initialPage}${boilerQuery}${partsQuery}`); 
               
                return
            }

            if(boilers.length){
                updateParamsAndFilter({
                    boiler: encodedBoilerQuery,
                    offset: initialPage + 1,
                },`${initialPage}${boilerQuery}`);
                
                return
            }
            if(parts.length ){
                updateParamsAndFilter({
                    parts: encodedPartsQuery,
                    offset: initialPage + 1,
                },`${initialPage}${partsQuery}`)
                
                return
            }
            if(boilers.length && isPriceRangeChanged){
                updateParamsAndFilter({ 
                    boiler: encodedBoilerQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,
                },`${initialPage}${boilerQuery}${priceQuery}`)
              
                return
            }
            if(parts.length && isPriceRangeChanged){
                updateParamsAndFilter({
                    parts: encodedPartsQuery,
                    priceFrom,
                    priceTo,
                    offset: initialPage + 1,
                },`${initialPage}${partsQuery}${priceQuery}`)
               
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
        {isMobile? <div/> : <CatalogFiltersDesktop 
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