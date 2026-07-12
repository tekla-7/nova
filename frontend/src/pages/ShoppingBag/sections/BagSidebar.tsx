import {LockKeyhole} from "lucide-react";
import {useUserCartData} from "../../../hooks/useUserData.ts";
import {Link} from "react-router-dom";

export default function BagSidebar() {
    const {data} = useUserCartData();
    const itemCount = (data ?? []).reduce((prev, cur) => prev + cur.quantity, 0);
    const subTotal = (data ?? []).reduce((prev, cur) => cur.product.price + prev, 0)
    const tax = subTotal * 108 / 100;
    const total = subTotal + tax

    return <div className='p-5 bg-[#fcfcfb]'>
        <h1 className='text-sm font-medium  mb-3.5 '>Order summary </h1>
        <div className='flex items-center justify-between mb-2 text-[13px]'>
            <p className='text-[#52514e]'>Subtotal ({itemCount} items)</p>
            <p>${subTotal.toFixed(2)}</p>
        </div>
        <div className='flex items-center justify-between mb-2 text-[13px]'>
            <p className='text-[#52514e]'>Shipping</p>
            <p className='text-[#2B8A3E]'>Free</p>
        </div>

        <div className='flex items-center justify-between pb-2 text-[13px] border-b border-[#0b0b0b]/10'>
            <p className='text-[##52514e]'>Tax (8%)</p>
            <p className=''>${tax.toFixed(2)}</p>
        </div>
        <h1 className='text-sm font-medium  my-2.5 items-center justify-between flex'>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </h1>
        <div className='flex flex-col gap-2'>
            <button type='button'
                    className=' cursor-pointer flex items-center justify-center px-4 py-2 text-[14px] bg-transparent border border-[#0b0b0b]/20 font-medium rounded-lg gap-1 w-full'
            >
                <LockKeyhole size={12}/>
                Proceed to checkout

            </button>
            <Link to='/new-in'
                className='cursor-pointer flex items-center justify-center px-4 py-2 text-[14px] bg-transparent border border-[#0b0b0b]/20 font-medium rounded-lg gap-1 w-full'>
                Continue shopping
            </Link>
        </div>
    </div>
}