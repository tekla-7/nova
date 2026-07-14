import type {Order} from "../../../types/Order.ts";
import {Circle} from "lucide-react";
import FormatDate from "../../../components/ui/FormatDate.tsx";


export default function Tracking({order}: { order: Order }) {
    return <>
        <h1 className='text-xs font-semibold tracking-wider uppercase mb-3.5 text-[#898781]'>delivery tracking</h1>
        <div className='flex items-start gap-3 pb-4.5'>
            <div className='flex flex-col items-center w-5 shrink-0'>
                <Circle className='fill-[#009300] text-[#009300] mt-0.5' size={17}/>
                <span className='w-[0.5px] min-h-6 my-0.5 h-full rounded-lg bg-[#009300]'></span>
            </div>


            <div>
                <h2 className='text-[#006300] text-xs font-medium mb-0.5'>Order confirmed</h2>
                <FormatDate className='text-[11px] text-[#898781]' date={order.tracking.orderConfirm.date[0]}
                            showTime={true}/>
                <p className='text-[11px] pt-0.5 text-[#52514e] '>
                    Payment of ${order.paid} received
                    by {order.paymentMethod} {order.paymentMethod === 'Card' && <>⋅⋅⋅{order.payment.number.slice(-4)}</>}
                </p>
            </div>
        </div>
    </>
}