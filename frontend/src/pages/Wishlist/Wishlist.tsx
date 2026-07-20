import {NavLink} from "react-router-dom";
import {useUserWishlist} from "../../hooks/useUserData";
import BaseButton from "../../components/ui/BaseButton.tsx";
import WishlistItem from "./sections/WishlistItem.tsx";
import type {Wishlist} from "../../types/user.ts";
import {useMutation} from "@tanstack/react-query";
import {removeProductFromWishlist} from "../../utils/http.ts";
import {queryClient} from "../../routes/router.tsx";
import {useCartMutation} from "../../hooks/useCartMutation.ts";

export default function Wishlist() {
    const {data: wishlist = []} = useUserWishlist();
    const wishlistItemCount = wishlist.length;
    const {addToCartHandler, isPending} = useCartMutation()

    const handleRemoveFromWishlist = useMutation({
        mutationFn: removeProductFromWishlist,
        onSuccess: async () => {
             queryClient.invalidateQueries({queryKey: ['userWishlist'], refetchType: "all",}).then(()=>console.log('Invalidation complete'));
        }
    })

    function onAdd(product: Wishlist) {
       addToCartHandler([product])
    }
function onAddAll(){
        addToCartHandler(wishlist)
}
    function onRemove(id: number) {
        handleRemoveFromWishlist.mutate(id)
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
                <BaseButton  onClick={onAddAll} type='button' variant='transparent'>

                    {!isPending&&'add all to bag'}{isPending&&'Loading...'}</BaseButton>
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