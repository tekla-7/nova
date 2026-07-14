import {useUserCartData} from "../../../hooks/useUserData.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {PRODUCT_COLORS} from "../../../constants/colors.ts";
import {useMemo} from "react";
import clsx from "clsx";
import DeliveryCard from "./DeliveryCard.tsx";
import {RefreshCcw} from "lucide-react";

type Prop = {
    activeStep: number,
}
export default function SideInfo({activeStep}: Prop) {
    const {data: shoppingBag = []} = useUserCartData();
    const checkout = useSelector((state: RootState) => state.checkout);
    const subtotal = useMemo(() => shoppingBag.reduce((prev, cur) => prev + cur.product.price * cur.quantity, 0), [shoppingBag])
    const shipping = checkout.shoppingStep?.shippingMethod?.price ?? 0
    const tax = useMemo(() => {
        const value = shipping + subtotal;
        return value + (value * 8) / 100
    }, [shipping, subtotal])
    const total = useMemo(() => {
        return subtotal + shipping + tax
    }, [subtotal, shipping, tax])
    return <div className='p-5 bg-[#fcfcfb]'>
        {activeStep!==3&&<> <h1 className='text-sm font-medium mb-3.5'>Order summary</h1>
        <ul className='mb-3.5'> {shoppingBag.map(cart => (
            <li key={cart.id} className='flex items-center gap-2 py-2 last:border-none border-b border-[#0b0b0b]/10'>
                <div className='w-9.5 h-12 rounded bg-white text-[9px] text-white shrink-0 relative'>
                    <img className='w-full h-full object-cover' src={cart.product.image} alt={cart.product.title}/>
                    <span
                        className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center bg-[#0b0b0b]">{cart.quantity}</span>
                </div>
                <div className='flex-1 min-w-0'>
                    <h1 className='text-xs font-medium text-nowrap mb-0.5'>{cart.product.title}</h1>
                    <p className='text-[10px] text-[#898781] '>{PRODUCT_COLORS.find(el => el.value === cart.color)?.name}
                        · {cart.size}</p>
                </div>
            </li>
        ))}</ul></>}
        <div className='flex flex-col gap-1.5 pb-2.5 border-b border-[#0b0b0b]/10 mb-2.5'>
            <div className='flex items-center font-medium justify-between text-xs'>
                <span className='text-[#52514e]'>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </div>
            {activeStep!==1&& <div className='flex items-center font-medium justify-between text-xs'>
                <span className='text-[#52514e]'>Shipping</span>
                <span className={clsx(
                    {'text-[#006300]': shipping === 0}
                )}>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
            </div>}
            <div className='flex items-center font-medium justify-between text-xs'>
                <span className='text-[#52514e]'>Tax(8%)</span>
                <span>${tax.toFixed(2)}</span>
            </div>
        </div>
        <div className='flex items-center font-medium justify-between text-sm'>
            <span className='text-[#52514e]'>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>
        {activeStep === 2 && <div className='mt-3 p-2.5 bg-white rounded-lg border border-[#0b0b0b]/10'>
            <h2 className='text-[11px] font-medium mb-1'>Shipping to</h2>
            {checkout.shoppingStep?.addressFormIsActive && <span
                className=' text-[11px] text-[#898781] font-medium'>{checkout.shoppingStep?.addressForm?.name} {checkout.shoppingStep?.addressForm?.lastName}
                <br/>
                {checkout.shoppingStep?.addressForm?.streetAddress}
                <br/>
                {checkout.shoppingStep?.addressForm?.city.name}, {checkout.shoppingStep?.addressForm?.zipCode}
            </span>}

            {!checkout.shoppingStep?.addressFormIsActive && <span
                className=' text-[11px] text-[#898781]  font-medium'>{checkout.shoppingStep?.address?.name} {checkout.shoppingStep?.address?.lastName}
                <br/>
                {checkout.shoppingStep?.address?.streetAddress}
                <br/>
                {checkout.shoppingStep?.address?.city.name},{checkout.shoppingStep?.address?.zipCode}
            </span>}
        </div>}
        {activeStep==3&&<>
<DeliveryCard/>
            <div className='mt-2.5 text-[11px] justify-center p-2.5 bg-[#fcfcfb] text-[#898781] rounded-lg border border-[#0b0b0b]/10 flex items-center gap-1'>
                <RefreshCcw size={12} />
             <span>Free returns within 30 days</span>
            </div>
        </>}
    </div>
}