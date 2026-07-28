import {NavLink} from "react-router-dom";
import {useUserCartData} from "../../hooks/useUserData.ts";
import BagItem from "./sections/BagItem.tsx";
import BagSidebar from "./sections/BagSidebar.tsx";
import {getCartSummary} from "../../utils/cart.ts";
import {useUpdateCartQuantity} from "../../hooks/cart/useUpdateCartQuantity.ts";
import {useDeleteCartMutation} from "../../hooks/cart/useDeleteCartMutation.ts";

export default function ShoppingBag() {
    const {data = []} = useUserCartData();
    const {itemCount} = getCartSummary(data ?? [])
    const {updateCartQuantityHelper} = useUpdateCartQuantity(data)
    const {deleteCartHandler} = useDeleteCartMutation()
    function onQuantityChange(id: string, quantity: number) {
        updateCartQuantityHelper(id, quantity)
    }
    function onDeleteCart(id: string) {
        deleteCartHandler(id)
    }
    return <section className='flex flex-col w-full'>
        <div className='flex items-center gap-1 border-b border-[#E5E0D8] py-3 px-6'>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/'>Home</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <p className='text-xs text-[#0D0D0D]'>Shopping bag</p>
        </div>
        <div className='grid grid-cols-[1fr_0.5fr] min-h-[70vh]'>
            <div className='p-5 border-r border-r-[#E5E0D8]'>

                <h1 className='text-5 tracking-tighter mb-4 flex items-center '>Shopping bag <span
                    className='text-[14px] text-[#898781] pl-2'>({itemCount} items)</span></h1>
                <ul>   {(data ?? []).map(cart =>
                    <BagItem onQuantityChange={onQuantityChange} onDeleteCart={() => onDeleteCart(cart.id)} cart={cart}
                             key={cart.id}/>
                )}</ul>
            </div>
            <BagSidebar/>
        </div>
    </section>
}
