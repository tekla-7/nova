import {NavLink} from "react-router-dom";
import {useUserWishlist} from "../../hooks/useUserData";
import BaseButton from "../../components/ui/BaseButton.tsx";
import WishlistItem from "./sections/WishlistItem.tsx";
import type {Wishlist} from "../../types/user.ts";
import {useCartMutation} from "../../hooks/cart/useCartMutation.ts";
import {useRemoveWishlistMutation} from "../../hooks/wishlist/useRemoveWishlistMutation.ts";

export default function Wishlist() {
    const {data: wishlist = []} = useUserWishlist();
    const wishlistItemCount = wishlist.length;
    const {addWishlistToCartHandler, isPending} = useCartMutation()
    const {removeFromWishlistHelper}=useRemoveWishlistMutation()
    function onAdd(product: Wishlist) {
        addWishlistToCartHandler([product])
    }
    function onAddAll() {
        addWishlistToCartHandler(wishlist)
    }

    function onRemove(id: number) {
        removeFromWishlistHelper(id)
    }

    return <section className='flex flex-col w-full'>
        <div className='flex items-center gap-1 border-b border-[#E5E0D8] py-3 px-6'>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/'>Home</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <p className='text-xs text-[#0D0D0D]'>Wishlist</p>
        </div>
        <div className='p-5'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='text-xl tracking-tight flex items-center'>My Wishlist <span
                    className='text-sm text-[#898781] ml-1.5'>({wishlistItemCount} items)</span></h1>
                <BaseButton onClick={onAddAll} type='button' variant='transparent'>

                    {!isPending && 'add all to bag'}{isPending && 'Loading...'}</BaseButton>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {wishlist.map(cart =>
                    <WishlistItem item={cart} key={cart.productId} onAdd={() => onAdd(cart)}
                                  onRemove={() => onRemove(cart.productId)}/>
                )}
            </div>

        </div>
    </section>
}