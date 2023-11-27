import { addToCartFx, removeFromCartFx } from "@/app/api/shopping-cart";
import { removeShoppingCartItem, updateShoppingCart } from "@/context/shoppingCart";
import { toast } from "react-toastify";

export const toggleCartItem = async (
    username:string,
    partId:number,
    isInCart:boolean,
    setSpinner:(arg0:boolean) => void
    ) => {
        try{
            setSpinner(true);
            if(isInCart){
                await removeFromCartFx(`/shopping-cart/one/${partId}`);
                removeShoppingCartItem(partId);
                return
            }
            const data = await addToCartFx({
                url: `/shopping-cart/add`,
                username,
                partId,
            });

            updateShoppingCart(data);

        }catch(error){
            toast.error((error as Error).message);
        }
        finally{
            setSpinner(false);
        }

}

export const  removeItemFromCart = async (partId:number,setSpinner:(arg0:boolean) => void) => {
    try {
        setSpinner(true);
        await removeFromCartFx(`/shopping-cart/one/${partId}`); 
        removeShoppingCartItem(partId);
    } catch (error) {
        toast.error((error as Error).message);


    }finally{
        setSpinner(false)
    }
}
