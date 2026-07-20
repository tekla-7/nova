import {NavLink, useLoaderData,} from "react-router-dom";
import type {Order} from "../../types/Order.ts";
import {Check, Ellipsis} from "lucide-react";
import Tracking from "./sections/Tracking.tsx";
import FormatDate from "../../components/ui/FormatDate.tsx";
import OrderItems from "./sections/OrderItems.tsx";
import OrderInformation from "./sections/OrderInformation.tsx";
import Summary from "./sections/Summary.tsx";


export default function Order() {
    const order = useLoaderData<Order>();
    console.log(order)

    return <section className='flex flex-col w-full'>
        <div className='flex items-center gap-1 border-b border-[#E5E0D8] py-3 px-6'>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/'>Home</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/profile'>Profile</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/orders'>Orders</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>

            <p className='text-xs text-[#0D0D0D]'>#{order.orderNumber}</p>
        </div>
        <div className='grid grid-cols-[1fr_0.7fr] min-h-[70vh]'>
            <div className='p-5 border-r border-r-[#E5E0D8]'>
                <h1 className='text-[20px] mb-1 tracking-tighter'>Order #{order.orderNumber}</h1>
                <FormatDate className='text-xs text-[#898781] pb-2.5' date={order.tracking.delivered.date[1]}
                            showTime={false}>
                    Placed on
                </FormatDate>
                {order.tracking.delivered.isConfirmed && <span
                    className='px-3 gap-1 w-max text-[#006300] bg-[#caeac7] rounded-[20px] font-medium py-1 text-xs flex items-center '>
<Check size={12}/> Delivered
                </span>}
                {!order.tracking.delivered.isConfirmed && <span
                    className='px-3 gap-1 w-max text-[#898781] border border-[#0b0b0b]/20 bg-transparent rounded-[20px] font-medium py-1 text-xs flex items-center '>
    <Ellipsis size={12}/>
 In Progress
                </span>}
                <Tracking order={order}/>
                <OrderItems order={order}/>
                <OrderInformation order={order}/>
            </div>
            <Summary/>
        </div>
    </section>
}