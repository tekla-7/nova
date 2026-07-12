import type {Wishlist} from "../../../types/user.ts";
import {useUserCartData} from "../../../hooks/useUserData.ts";

export default function WishlistItem({cart,onClick}:{cart:Wishlist,onClick:()=>void}) {
    const {data:bag=[]}=useUserCartData()
    const isInBag=bag.some(el=>el.product.productId===cart.productId)
    return <li
        className="w-full transition-all ease-in-out duration-150  px-4 py-3 flex items-center gap-2.5 border-b border-b-[#F0EDE8] last:border-b-0"

    >
        <img
            className="w-11 h-14 rounded-[6px] object-cover shrink-0"
            src={cart.image}
            alt="image"
        />

        <div className="flex-1 min-w-0">
            <p className="text-xs font-medium break-words">
                {cart.title}
            </p>

            <p className="pt-0.5 text-[10px] text-[#898781]">
                ${cart.price}
            </p>

        </div>

        <button
            disabled={isInBag}
            onClick={onClick}
            className={`${isInBag ? 'text-green-700 border-gray-700/20' : 'cursor-pointer border-[#0B0B0B33]'} text-xs px-4 py-2 rounded-lg  border flex items-center justify-center cursor-pointer mt-2`}>
            {isInBag&&<>✓ In your bag</>}
            {!isInBag&&<> Add to bag</>}

        </button>
    </li>
}