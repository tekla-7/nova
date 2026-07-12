import type {Wishlist} from "../../../types/user.ts";
import {X} from "lucide-react";
import {useUserCartData} from "../../../hooks/useUserData.ts";

type Props = {
    item: Wishlist,
    onRemove: () => void,
    onAdd: () => void,
}
export default function WishlistItem({item, onRemove, onAdd}: Props) {
    const {data: bag = []} = useUserCartData();
    const isInBag = bag.some(el => el.product.productId === item.productId)
    return <div
        className='border border-[#0b0b0b]/20 rounded-[10px] overflow-hidden flex flex-col items-center justify-between '>
        <div className='bg-[#fcfcfb] relative w-full items-center justify-center flex'>
            <img src={item.image} alt={item.title} className='aspect-[3/4]  max-h-[170px] object-cover'/>
            <button onClick={onRemove} type='button'
                    className='bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer flex items-center justify-center z-[2] w-8 h-6 absolute top-2 right-2'>
                <X size={14}/></button>
        </div>
        <div className='px-3 py-2.5 w-full '>
            <p className='text-[10px] text-[#898781] uppercase tracking-wider'>{item.brand ?? '-'}</p>
            <p className='text-[13px] font-medium pt-0.5 pb-1'>{item.title}</p>
            <p className='text-[14px] font-medium pb-2'>${item.price.toFixed(2)}</p>
            <button type='button' onClick={onAdd}
                    className='px-2 py-3 bg-transparent text-[14px] border w-full flex items-center justify-center border-[#0b0b0b]/20 rounded-lg cursor-pointer'
                    disabled={isInBag}>
                {!isInBag && <span className='font-medium'>ADD TO BAG</span>}
                {isInBag && <span className='font-medium text-green-700'>✓ In your bag</span>}
            </button>
        </div>
    </div>
}