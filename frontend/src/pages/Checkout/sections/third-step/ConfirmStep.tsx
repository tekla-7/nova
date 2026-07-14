import {useUserCartData} from "../../../../hooks/useUserData.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../store";
import {CreditCard} from "lucide-react";
import {useMemo} from "react";
import {LockKeyhole} from 'lucide-react';
import {PRODUCT_COLORS} from "../../../../constants/colors.ts";
import {useOrderMutation} from "../../../../hooks/useOrderMutation.ts";
import type {CreateOrder} from "../../../../types/Order.ts";

export default function ConfirmStep({onStepCompleted}: { onStepCompleted: (id: number) => void }) {
    const {data: shoppingBag = []} = useUserCartData();
    const checkout = useSelector((state: RootState) => state.checkout);
    const total = useMemo(() => {
        if (!shoppingBag || !checkout.paymentStep || !checkout.shoppingStep) return 0;
        const shipping = checkout.shoppingStep.shippingMethod.price;
        const subtotal = shoppingBag.reduce((prev, cur) => prev + cur.quantity * cur.product.price, 0)

        return (shipping + subtotal) * 108 / 100;
    }, [shoppingBag, checkout])
    const {createOrderHandler, isPending} = useOrderMutation()

    function createOrder() {
        if (!checkout.paymentStep || !checkout.shoppingStep || !shoppingBag.length) return null;
        const paymentStep = checkout.paymentStep
        const shoppingStep = checkout.shoppingStep
        const address= shoppingStep.addressFormIsActive ? shoppingStep.addressForm : shoppingStep.address
        if(!address) return null;
        const order: CreateOrder = {
            paid: total,
            email:shoppingStep.email,
            phone:shoppingStep.phone,
            payment: paymentStep.cardFormIsActive ? paymentStep.cardForm : paymentStep.card,
            paymentMethod: 'Card',
            deliveryMethod: shoppingStep.shippingMethod,
            items: shoppingBag,
            address: address,
        }
        createOrderHandler(order)
    }


    return <div className='flex flex-col gap-3'>
        <div className='border border-[#0b0b0b]/10 rounded-[10px] overflow-hidden'>
            <div
                className='flex rounded-t-[10px] items-center justify-between px-3.5 py-3 border  border-[#0b0b0b]/10 bg-[#fcfcfb]'>
                <span className='uppercase text-sm font-semibold tracking-wider text-[#898781]'>Shipping address</span>
                <button
                    onClick={() => onStepCompleted(1)}
                    className='border-none outline-none text-[11px] bg-none cursor-pointer underline underline-offset-2 '>Edit
                </button>
            </div>
            <div className='text-xs px-3.5 py-3 text-[#52514e]'>
                {!checkout.shoppingStep?.addressFormIsActive && <> {checkout.shoppingStep?.address?.name} {checkout.shoppingStep?.address?.lastName}
                    <br/>
                    {checkout.shoppingStep?.address?.streetAddress}
                    <br/>
                    {checkout.shoppingStep?.address?.city.name}, {checkout.shoppingStep?.address?.zipCode}, {checkout.shoppingStep?.address?.country.name}
                    <br/>
                    {checkout.shoppingStep?.phone}</>}
                {checkout.shoppingStep?.addressFormIsActive && <> {checkout.shoppingStep?.addressForm?.name} {checkout.shoppingStep?.addressForm?.lastName}
                    <br/>
                    {checkout.shoppingStep?.addressForm?.streetAddress}
                    <br/>
                    {checkout.shoppingStep?.addressForm?.city.name}, {checkout.shoppingStep?.addressForm?.zipCode}, {checkout.shoppingStep?.addressForm?.country.name}
                    <br/>
                    {checkout.shoppingStep?.phone}</>}
            </div>
        </div>
        <div className='border border-[#0b0b0b]/10 rounded-[10px] overflow-hidden'>
            <div
                className='flex  rounded-t-[10px] items-center justify-between px-3.5 py-3 border  border-[#0b0b0b]/10 bg-[#fcfcfb]'>
                <span className='uppercase text-sm font-semibold tracking-wider text-[#898781]'>payment</span>
                <button onClick={() => onStepCompleted(2)}
                        className='border-none outline-none text-[11px] bg-none cursor-pointer underline underline-offset-2 '>Edit
                </button>
            </div>
            <div className='text-xs px-3.5 py-3 text-[#52514e] flex items-center gap-2'>

                <CreditCard size={22} className='text-blue-900'/>


                <div>
                    {checkout.paymentStep?.cardFormIsActive && <>  <h1
                        className='text-[12px] font-medium font-mono'>{checkout.paymentStep?.cardForm?.number.split('').map((el, index) => {
                        const char = index > 11 ? el : '·';
                        if ((index + 1) % 4 === 0 && index !== 15) {
                            return char + ' ';
                        }
                        return char;
                    }).join('')}</h1>
                        <div className='flex items-center justify-between'>
                            <p className='text-[11px] text-[#898781] pt-0.5'>Expires {checkout.paymentStep?.cardForm?.expiryData}</p>
                        </div>
                    </>}
                    {!checkout.paymentStep?.cardFormIsActive && <>  <h1
                        className='text-[12px] font-medium font-mono'>{checkout.paymentStep?.card?.number.split('').map((el, index) => {
                        const char = index > 11 ? el : '·';
                        if ((index + 1) % 4 === 0 && index !== 15) {
                            return char + ' ';
                        }
                        return char;
                    }).join('')}</h1>
                        <div className='flex items-center justify-between'>
                            <p className='text-[11px] text-[#898781] pt-0.5'>Expires {checkout.paymentStep?.card?.expiryData}</p>
                        </div>
                    </>}

                </div>


            </div>
        </div>
        <div className='border  border-[#0b0b0b]/10 rounded-[10px] overflow-hidden'>
            <div
                className='flex rounded-t-[10px] items-center justify-between px-3.5 py-3 border  border-[#0b0b0b]/10 bg-[#fcfcfb]'>
                <span className='uppercase text-sm font-semibold tracking-wider text-[#898781]'>delivery</span>
                <button onClick={() => onStepCompleted(1)}
                        className='border-none outline-none text-[11px] bg-none cursor-pointer underline underline-offset-2 '>Edit
                </button>
            </div>
            <div className='text-xs px-3.5 py-3 text-[#52514e]'>
                {checkout.shoppingStep?.shippingMethod.title}
                <br/>
                {checkout.shoppingStep?.shippingMethod.description} · {checkout.shoppingStep?.shippingMethod.price === 0 ?
                <span className='text-[#006300]'>Free</span> : `$ ${checkout.shoppingStep?.shippingMethod.price}`}
            </div>
        </div>
        <div className='border border-[#0b0b0b]/10 rounded-[10px] overflow-hidden'>
            <div
                className=' rounded-t-[10px] flex items-center justify-between px-3.5 py-3 border  border-[#0b0b0b]/10 bg-[#fcfcfb]'>
                <span
                    className='uppercase text-sm font-semibold tracking-wider text-[#898781]'>items ({shoppingBag.reduce((prev, cur) => prev + cur.quantity, 0)})</span>
            </div>
            <ul className='text-xs px-3.5 py-3 text-[#52514e]'>
                {shoppingBag.map(cart => (
                    <li key={cart.id}
                        className='flex items-center gap-2 py-2 last:border-none border-b border-[#0b0b0b]/10'>
                        <div className='w-9.5 h-12 rounded bg-white text-[9px] text-white shrink-0 relative'>
                            <img className='w-full h-full object-cover' src={cart.product.image}
                                 alt={cart.product.title}/>
                            <span
                                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center bg-[#0b0b0b]">{cart.quantity}</span>
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h1 className='text-xs font-medium text-nowrap mb-0.5'>{cart.product.title}</h1>
                            <p className='text-[10px] text-[#898781] '>{PRODUCT_COLORS.find(el => el.value === cart.color)?.name}
                                · {cart.size}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <button
            onClick={createOrder} title='button'
            className='px-4 py-2 font-semibold flex items-center justify-center text-sm bg-transparent border border-[#0b0b0b] rounded-lg cursor-pointer'>
            {isPending&&'Loading ....'} {!isPending&&<><LockKeyhole size={14} className='mr-1'/>
            Place order · ${total.toFixed(2)}</>}
        </button>
    </div>
}