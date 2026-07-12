import type {CartItem} from "../../../types/user.ts";
import {PRODUCT_COLORS} from "../../../constants/colors.ts";

export default function ProductCartItem({cart ,onClick}: { cart: CartItem,onClick?: () => void, }) {
    return <li
        className="w-full transition-all ease-in-out duration-150  px-4 py-3 flex items-center gap-2.5 border-b border-b-[#F0EDE8] last:border-b-0"

    >
        <img
            className="w-11 h-14 rounded-[6px] object-cover shrink-0"
            src={cart.product.image}
            alt="image"
        />

        <div className="flex-1 min-w-0">
            <p className="text-xs font-medium break-words">
                {cart.product.title}
            </p>

            <p className="pt-0.5 text-[10px] text-[#898781]">
                {PRODUCT_COLORS.find(el => el.value === cart.color)?.name}
                · {cart.size}
                · {cart.quantity}
            </p>

            <button
                onClick={onClick}
                className="text-xs px-3 py-1 rounded-lg border-[#0B0B0B33] border flex items-center justify-center cursor-pointer mt-2">
                Remove
            </button>
        </div>

        <p className="text-[13px] font-medium shrink-0">
            ${cart.product.price}
        </p>
    </li>
}