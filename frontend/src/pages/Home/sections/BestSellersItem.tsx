import type {Product} from "../../../types/product.ts";
import Price from "../../../components/ui/Price.tsx";
import {useState} from "react";


export default function BestSellersItem({event}: { event: Product }) {
    const [amount] = useState(() => Math.round(Math.random() * 100));
    return <div className=" rounded-lg p-3 border border-[#ffffff1f] overflow-hidden bg-[#ffffff14]">

        <img
            src={event.images[0]}
            alt={event.title}
            className="aspect-[3/4]  max-h-[170px] mb-2 rounded-lg w-full object-cover"
        />

        <div className="">
            <h3 className="text-xs cursor-pointer pb-1 text-[#ffffffcc] font-medium">{event.title}</h3>
            <Price price={event.price} discountPercentage={event.discountPercentage} type='light'/>
            <div className="h-[3px] bg-[#ffffff26] rounded-sm mt-1.5 relative">
                <div className='absolute left-0 top-0 bg-[#C8A97E] rounded-sm h-[3px]' style={{ width: `${amount}%` }}></div>
            </div>
            <p className='text-[10px] mt-1.5 text-[#ffffff66]'>{amount} % sold</p>
        </div>
    </div>


}