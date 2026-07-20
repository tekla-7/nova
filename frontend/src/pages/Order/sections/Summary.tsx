import type {Order} from "../../../types/Order.ts";
import clsx from "clsx";
import {useLoaderData} from "react-router-dom";
import {RefreshCcw, MessageSquareText, Truck, ArrowDownToLine} from 'lucide-react';
import FormatDate from "../../../components/ui/FormatDate.tsx";

export default function Summary() {
    const order = useLoaderData<Order>();

    const subtotal = order.items.reduce((prev, cur) => prev + cur.product.price * cur.quantity, 0)
    const items = order.items.reduce((prev, cur) => cur.quantity + prev, 0)
    const shipping = order.deliveryMethod.price
    const tax = (subtotal + shipping) * 108 / 100
    const date = new Date(order.createdAt + 30).toDateString()

    return <div className='p-5 bg-[#fcfcfb]'>
        <h1 className='text-sm font-medium mb-3.5'>Order summary</h1>

        <div className='flex flex-col gap-1.5 pb-2.5 border-b border-[#0b0b0b]/10 mb-2.5'>
            <div className='flex items-center font-medium justify-between text-xs'>
                <span className='text-[#52514e]'>Subtotal ({items} items)</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex items-center font-medium justify-between text-xs'>
                <span className='text-[#52514e]'>Shipping</span>
                <span className={clsx(
                    {'text-[#006300]': shipping === 0}
                )}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>
            <div className='flex items-center font-medium justify-between text-xs'>
                <span className='text-[#52514e]'>Tax(8%)</span>
                <span>${tax.toFixed(2)}</span>
            </div>
        </div>
        <div className='flex items-center font-medium justify-between text-sm'>
            <span className='text-[#52514e]'>Total paid</span>
            <span>${order.paid.toFixed(2)}</span>
        </div>
        <div className='bg-white border border-[#0b0b0b]/10 rounded-lg py-3 px-3.5 mt-5 '>
            <h1 className='text-xs font-medium mb-2'>Need help with this order?</h1>
            <div className='flex items-center gap-1.5 text-xs cursor-pointer py-1.5 border-b border-[#0b0b0b]/10'>
                <RefreshCcw className='text-[#898781]' size={12}/>
                <span>Return an item</span>
            </div>
            <div className='flex items-center gap-1.5 text-xs cursor-pointer py-1.5 border-b border-[#0b0b0b]/10'>
                <MessageSquareText className='text-[#898781]' size={12}/>

                <span>Contact support</span>
            </div>
            <div className='flex items-center gap-1.5 text-xs cursor-pointer py-1.5 border-b border-[#0b0b0b]/10'>
                <Truck className='text-[#898781]' size={12}/>

                <span>
          Track package
        </span>
            </div>
            <div className='flex items-center gap-1.5 text-xs cursor-pointer py-1.5 '>
                <ArrowDownToLine className='text-[#898781]' size={12}/>

                <span>


          Download invoice

                </span>
            </div>

        </div>
        <div className='mt-2.5 rounded-lg py-2.5 px-3 bg-[#f9dca4] border border-[#eda100]'>
            <h1 className='text-[11px] font-medium text-[#734500] mb-0.5'>Returns window</h1>
            <div className='text-[#734500] text-[11px]'>
                Free returns accepted until <br/>
                <span className='flex items-center gap-1'><strong><FormatDate date={date}/></strong>(30 days)</span>
            </div>
        </div>
    </div>
}