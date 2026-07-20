import type {Order} from "../../../types/Order.ts";
import FormatDate from "../../../components/ui/FormatDate.tsx";

export default function OrderInformation({order}: { order: Order }) {
    return <>
        <h1 className='text-xs mt-5 font-semibold tracking-wider uppercase mb-3.5 text-[#898781]'>
            Order information
        </h1>
        <div className='grid grid-cols-2 gap-2.5'>
            <div className='border border-[#0b0b0b]/10 rounded-lg px-3.5 py-3 bg-white'>
                <p className='text-[10px] font-semibold uppercase text-[#898781] pb-2'>delivered to</p>
                <h1 className='textt-[13px] text-[#0b0b0b] font-medium'>{order.userName}</h1>
                <span className='text-xs text-[#52514e]'>
{order.address.streetAddress} <br/>
                    {order.address.city?.name} ,ZIP:{order.address?.zipCode}
                    <br/>
                    {order.address.state?.name} , {order.address.country?.name}
            </span>
            </div>
            <div className='border border-[#0b0b0b]/10 rounded-lg px-3.5 py-3 bg-white'>
                <p className='text-[10px] font-semibold uppercase text-[#898781] pb-2'>payment</p>
                <h1 className='textt-[13px] text-[#0b0b0b] font-medium'>{order.paymentMethod === 'Card' ?`Card ···${order.payment.number.slice(-4)}`  : order.paymentMethod}</h1>
                <span className='text-xs text-[#52514e]'>
                    <FormatDate date={order.createdAt} showTime={false}>Charged </FormatDate>
                   Paid: ${order.paid.toFixed(2)} USD
            </span>
            </div>
            <div className='border border-[#0b0b0b]/10 rounded-lg px-3.5 py-3 bg-white'>
                <p className='text-[10px] font-semibold uppercase text-[#898781] pb-2'>Shipping method</p>
                <h1 className='textt-[13px] text-[#0b0b0b] font-medium'>{order.deliveryMethod.title}</h1>
                <span className='text-xs text-[#52514e]'>
FedEx Ground
                    <br/>
                    {order.deliveryMethod.description}
            </span>
            </div>
            <div className='border border-[#0b0b0b]/10 rounded-lg px-3.5 py-3 bg-white'>
                    <p className='text-[10px] font-semibold uppercase text-[#898781] pb-2'>contact</p>
                    <h1 className='textt-[13px] text-[#0b0b0b] font-medium'>{order.email}</h1>
                    <span className='text-xs text-[#52514e]'>
{order.phone}
                        <br/>
                   Order receipt sent by email
            </span>
                </div>



        </div>
        </>


        }