import {Handbag, Heart} from 'lucide-react';
import {Link} from "react-router-dom";
import {type Ref} from "react";
import {useUserWishlist} from "../../../hooks/useUserData.ts";
import WishlistItem from "./WishlistItem.tsx";
import {useCartMutation} from "../../../hooks/useCartMutation.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {uiAction} from "../../../store/ui-slice.tsx";

export default function WishlistDropdown({ref}: { ref: Ref<HTMLDivElement> }) {
    const isOpen = useSelector(
        (state: RootState) => state.ui.isWishlistOpen
    );
    const {
        data = [],
    } = useUserWishlist();
    const dispatch = useDispatch();

    const {addToCartHandler, isPending} = useCartMutation()
    const cartItems = data.slice(0, 3);
    const itemCount = data.length;
    const subTotal = data.reduce((prev, cur) => cur.price + prev, 0);

    function toggleOpen() {
        dispatch(uiAction.toggle('isWishlistOpen'))
    }

    function onAddToBag(id: number) {
        const product = data.find((item) => item.productId === id);
        if (!product) return
        addToCartHandler([{
            productId: product.productId,
            title: product.title,
            price: product.price,
            brand: product.brand || '-',
            image: product.image,
        }])

    }

    function addAllToBag() {
        addToCartHandler(data)
    }


    return <div className='relative' ref={ref}>
        <div className='relative'>
            <Heart onClick={toggleOpen} size={18} className='cursor-pointer'/>
            {itemCount > 0 &&
                <span
                    className='text-[9px] text-white bg-[#0b0b0b] w-[15px] h-[15px] rounded-full flex items-center justify-center absolute -top-1.5 -right-1.5'>{itemCount}</span>}
        </div>

        <div
            className={`absolute top-12 -right-2 w-[340px] rounded-[10px] border border-[#E5E0D8] bg-white
  transition-all duration-300 ease-out cursor-auto
  ${
                isOpen
                    ? "opacity-100 translate-y-0 scale-100 visible"
                    : "opacity-0 -translate-y-2 scale-95 invisible"
            }`}>

            {itemCount == 0 &&
                <div className='p-4 flex items-center flex-col'>
                    <p className='text-[12px] pb-3 pt-2 text-[#9A9A9A]'>Your bag is empty</p>
                    <Link to="/new-in" onClick={toggleOpen}
                          className='text-sm px-4 text-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-2'>
                        Start shopping
                    </Link></div>
            }
            {itemCount > 0 && <div className='flex flex-col'>
                <div className='py-3.5 px-4 border-b border-b-[#F0EDE8]  flex items-center justify-between'>
                    <span className='text-xs font-medium'>Your wishlist </span>
                    <span className='text-[#9A9A9A] text-xs'>{itemCount} items</span>
                </div>
                <ul>
                    {cartItems.map(cart =>
                        <WishlistItem key={cart.productId} cart={cart} onClick={() => onAddToBag(cart.productId)}/>
                    )}
                </ul>
                <div className='py-3.5 px-4 flex flex-col '>
                    <div className='text-[#0b0b0b] flex items-center justify-between text-[13px] mb-2.5'>
                        <span>Subtotal</span>
                        <span>${subTotal.toFixed(2)}</span>
                    </div>

                    <Link to="/wishlist"  onClick={toggleOpen}
                          className='text-sm font-medium px-4 flex items-center justify-center text-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-2'>
                        <Heart size={14} className='mr-1'/> View all wishlist
                    </Link>
                    <button onClick={addAllToBag}
                            className='text-sm font-medium px-4 flex items-center justify-center text-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-1.5'>
                        <Handbag size={14} className='mr-1.5'/>{isPending && <>Loading
                        ...</>} {!isPending && <>Add all to bag</>}
                    </button>
                </div>
            </div>
            }


        </div>
    </div>

}