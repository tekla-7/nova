import type {Order} from "../../../types/Order.ts";
import {Circle} from "lucide-react";
import FormatDate from "../../../components/ui/FormatDate.tsx";
import clsx from "clsx";


export default function Tracking({order}: { order: Order }) {
    return <>
        <h1 className='text-xs mt-5 font-semibold tracking-wider uppercase mb-3.5 text-[#898781]'>delivery tracking</h1>
        <div className='flex items-start gap-3 pb-4.5'>
            <div className='flex flex-col items-center w-5 shrink-0'>
                <Circle className='fill-[#009300] text-[#009300] mt-0.5' size={17}/>
                <span className='w-[1px] min-h-6 my-0.5 h-full rounded-lg bg-[#009300]'></span>
            </div>


            <div>
                <h2 className='text-[#006300] text-xs font-medium mb-0.5'>Order confirmed</h2>
                <FormatDate className='text-[11px] text-[#898781]' date={order.tracking.orderConfirm.date[0]}
                            showTime={true}/>
                <p className='text-[11px] pt-0.5 text-[#52514e] '>
                    Payment of ${order.paid.toFixed(2)} received
                    by {order.paymentMethod} {order.paymentMethod === 'Card' && <>⋅⋅⋅{order.payment.number.slice(-4)}</>}
                </p>
            </div>
        </div>
        <div className='flex items-start gap-3 pb-4.5'>
            <div className='flex flex-col items-center w-5 shrink-0'>
                <Circle className={clsx('mt-0.5',
                    !order.tracking.processing.isConfirmed ? 'fill-[#0b0b0b]/20 text-[#0b0b0b]/20' : 'fill-[#009300] text-[#009300] '
                )} size={17}/>
                <span className={clsx('w-[1px] min-h-6 my-0.5 h-full rounded-lg ',
                    !order.tracking.processing.isConfirmed ? 'bg-[#0b0b0b]/20' : 'bg-[#009300]'
                )}></span>
            </div>
            <div>
                <h2 className={clsx('text-xs font-medium mb-0.5',
                   ! order.tracking.processing.isConfirmed ? 'text-[#0b0b0b]/60' : 'text-[#006300]')
                }>Processing</h2>
                <FormatDate className='text-[11px] text-[#898781]' date={order.tracking.processing.date[0]}
                            showTime={true}/>
                <p className='text-[11px] pt-0.5 text-[#52514e] '>
                    Items picked and packed at our warehouse
                </p>
            </div>


        </div>

        <div className='flex items-start gap-3 pb-4.5'>
            <div className='flex flex-col items-center w-5 shrink-0'>
                <Circle className={clsx('mt-0.5',
                    !order.tracking.dispatched.isConfirmed ? 'fill-[#0b0b0b]/20 text-[#0b0b0b]/20' : 'fill-[#009300] text-[#009300] '
                )} size={17}/>
                <span className={clsx('w-[1px] min-h-6 my-0.5 h-full rounded-lg ',
                    !order.tracking.dispatched.isConfirmed ? 'bg-[#0b0b0b]/20' : 'bg-[#009300]'
                )}></span>
            </div>
            <div>
                <h2 className={clsx('text-xs font-medium mb-0.5',
                    !order.tracking.dispatched.isConfirmed ? 'text-[#0b0b0b]/60' : 'text-[#006300]')
                }>Dispatched</h2>
                <FormatDate className='text-[11px] text-[#898781]' date={order.tracking.dispatched.date[0]}
                            showTime={false}/>
                <p className='text-[11px] pt-0.5 text-[#52514e] '>
                    Your package is with the driver today
                </p></div>
        </div>
        <div className='flex items-start gap-3 pb-4.5'>
            <div className='flex flex-col items-center w-5 shrink-0'>
                <Circle className={clsx('mt-0.5',
                    !order.tracking.outForDelivery.isConfirmed ? 'fill-[#0b0b0b]/20 text-[#0b0b0b]/20' : 'fill-[#009300] text-[#009300] '
                )} size={17}/>
                <span className={clsx('w-[1px] min-h-6 my-0.5 h-full rounded-lg ',
                    !order.tracking.outForDelivery.isConfirmed ? 'bg-[#0b0b0b]/20' : 'bg-[#009300]'
                )}></span>
            </div>
            <div>
                <h2 className={clsx('text-xs font-medium mb-0.5',
                    !order.tracking.outForDelivery.isConfirmed ? 'text-[#0b0b0b]/60' : 'text-[#006300]')
                }>Out for delivery</h2>
                <FormatDate className='text-[11px] text-[#898781]' date={order.tracking.outForDelivery.date[0]}
                            showTime={false}/>
                <p className='text-[11px] pt-0.5 text-[#52514e] '>
                    Your package is with the driver today
                </p></div>
        </div>
        <div className='flex items-start gap-3 pb-4.5'>
            <div className='flex flex-col items-center w-5 shrink-0'>
                <Circle className={clsx('mt-0.5',
                    !order.tracking.delivered.isConfirmed ? 'fill-[#0b0b0b]/20 text-[#0b0b0b]/20' : 'fill-[#009300] text-[#009300] '
                )} size={17}/>
                <span className={clsx('w-[1px] min-h-6 my-0.5 h-full rounded-lg ',
                    !order.tracking.delivered.isConfirmed ? 'bg-[#0b0b0b]/20' : 'bg-[#009300]'
                )}></span>
            </div>
            <div>
                <h2 className={clsx('text-xs font-medium mb-0.5',
                    !order.tracking.delivered.isConfirmed ? 'text-[#0b0b0b]/60' : 'text-[#006300]')
                }>Delivered</h2>
                <FormatDate className='text-[11px] text-[#898781]' date={order.tracking.delivered.date[1]}
                            showTime={false}/>
                <p className='text-[11px] pt-0.5 text-[#52514e] '>
                    Left at front door ·
                </p>
            </div>

        </div>
    </>
}