import {PRODUCT_COLORS} from "../../../constants/colors.ts";
import Quantity from "../../../components/ui/Quantity.tsx";
import {Check, Heart, Trash} from "lucide-react";
import type {CartItem} from '../../../types/user.ts'
import {queryClient} from "../../../routes/router.tsx";
import {useMutation} from "@tanstack/react-query";
import {addToWishlist} from "../../../utils/http.ts";
import {useUserWishlist} from "../../../hooks/useUserData.ts";

type props = {
    cart: CartItem,
    onQuantityChange: (id: string, q: number) => void,
    onDeleteCart: () => void
}
export default function BagItem({cart, onQuantityChange, onDeleteCart}: props) {
    const {data: wishlist=[]} = useUserWishlist();
    const isInWishlist = wishlist.some(el =>el.productId === cart.product.productId)

    function handleAddToWishlist() {
        wishlistMutation.mutate({
            productId: cart.product.productId,
            title: cart.product.title,
            price: cart.product.price,
            brand: cart.product.brand,
            image: cart.product.image,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ['userWishlist']}).then(() => console.log("invalidation completed"))
            }
        })
    }

    const wishlistMutation = useMutation({
        mutationFn: addToWishlist
    })
    return <li className='py-3.5 flex items-center  gap-3 border-b border-b-[#F0EDE8] last:border-none'>
        <img
            className="w-[72px] h-[90px] rounded-[6px] object-cover shrink-0"
            src={cart.product.image}
            alt="image"
        />
        <div className="flex-1 min-w-0">
            <p className='text-[10px] text-[#898781] tracking-wider uppercase'>{cart.product.brand} ·
                Nova</p>
            <p className="text-[13px] font-medium break-words">
                {cart.product.title}
            </p>

            <p className="pt-0.5 text-[11px] text-[#898781] pb-2">
                {PRODUCT_COLORS.find(el => el.value === cart.color)?.name}
                · {cart.size}
                · {cart.quantity}
            </p>

            <Quantity selectedQuantity={cart.quantity} size='large'
                      onSelectedQuantityChange={(quantity: number) => onQuantityChange(cart.id, quantity)}/>
            <div className='flex items-center gap-2 mt-2'>
                <button type='button' onClick={onDeleteCart}
                        className='w-auto cursor-pointer flex items-center justify-center px-4 py-2 text-[14px] bg-transparent border border-[#0b0b0b]/20 font-medium rounded-lg gap-1 '
                >
                    <Trash size={12}/>
                    Remove
                </button>
                <button
                    disabled={isInWishlist}
                    onClick={handleAddToWishlist}
                    className={`${isInWishlist?'text-green-700 border-gray-700/20':'cursor-pointer border-[#0b0b0b]/20'}
                   w-auto  flex items-center justify-center px-4 py-2 text-[14px] bg-transparent border font-medium rounded-lg gap-1 `}>
                    {!isInWishlist&&<> <Heart size={12}/>Save for later</>}
                    {isInWishlist&&<><Check size={14}/>In your wishlist</>}
                </button>
            </div>
        </div>

        <p className="text-[13px] font-medium shrink-0">
            ${cart.product.price}
        </p>

    </li>
}