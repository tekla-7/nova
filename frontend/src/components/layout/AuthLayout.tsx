import {CheckCheck} from "lucide-react";
import BaseButton from "../ui/BaseButton.tsx";
import {Link, Outlet, useLocation} from "react-router-dom";

export default function AuthLayout() {
    const location = useLocation();
    const isSignup = location.pathname.includes("sign-up");
    return <div className='w-full h-dvh grid grid-cols-[1.5fr_1fr]'>
        <div className='bg-[#0D0D0D]  flex flex-col items-start  py-12 px-8'>
            <div className='pb-9.5 w-full mb-6 border-b border-[#ffffff26] text-center'>
                <h1 className='text-white text-3xl mb-1.5 font-medium'>NOVA</h1>
                <p className='text-[#ffffff80] text-sm'>MODERN COMMERCE</p>
            </div>

            <p className='text-lg pb-2 text-white text-left '>
                Your style, <br/>your account.
            </p>
            <p className='text-[#ffffff80] text-xs text-left'>
                Track orders, save your wishlist,<br/>unlock exclusive member deals.
            </p>
            <div className='flex gap-2 flex-col pt-2 mt-10'>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#2B8A3E] w-5 h-5 rounded-full flex items-center justify-center'>
                        <CheckCheck size={12} className='text-white'/>
                    </div>
                    <p className='text-xs text-[#ffffffb3]'>Free delivery on all orders</p>

                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#2B8A3E] w-5 h-5 rounded-full flex items-center justify-center'>
                        <CheckCheck size={12} className='text-white'/>
                    </div>
                    <p className='text-xs text-[#ffffffb3]'>Early access to new arrivals</p>

                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#2B8A3E] w-5 h-5 rounded-full flex items-center justify-center'>
                        <CheckCheck size={12} className='text-white'/>
                    </div>
                    <p className='text-xs text-[#ffffffb3]'>Save and sync your wishlist</p>

                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#2B8A3E] w-5 h-5 rounded-full flex items-center justify-center'>
                        <CheckCheck size={12} className='text-white'/>
                    </div>
                    <p className='text-xs text-[#ffffffb3]'>Faster checkout every time</p>

                </div>
                <div className='flex items-center gap-2'>
                    <div className='bg-[#2B8A3E] w-5 h-5 rounded-full flex items-center justify-center'>
                        <CheckCheck size={12} className='text-white'/>
                    </div>
                    <p className='text-xs text-[#ffffffb3]'>Save up to 25% with member pricing</p>

                </div>

            </div>
        </div>
        {/*////*/}
        <div className='py-10 px-8 flex flex-col '>
            <h1 className=' text-2xl mb-1.5 font-medium'>
                {isSignup ? 'Create your account' : 'Welcome back'}
            </h1>
            {!isSignup && <p className='pb-8 text-[#4A4A4A] text-xs'>
                Sign in to your NOVA account</p>}
            {isSignup &&
                <p className='pb-8 text-[#4A4A4A] text-xs'>
                    Already have one?
                    <Link
                        to="/authentication"
                        className="ml-1 cursor-pointer text-[#0D0D0D] underline-offset-2 underline font-medium"
                    >
                        sign in
                    </Link></p>}
            <div className='flex flex-col justify-center gap-3'>
                <Outlet/>
                <div className='flex items-center gap-2.5 '>
                    <div className='h-[1px] flex-1 bg-[#E5E0D8]'></div>
                    <span
                        className='text-[11px] text-[#9A9A9A] pb-1'>{isSignup ? 'or sign up with' : 'or'}</span>
                    <div className='h-[1px] flex-1 bg-[#E5E0D8]'></div>
                </div>
                <div className='flex flex-col gap-2 mb-2'>
                    <BaseButton type='button' size='large' variant='transparent'>Continue with
                        Google</BaseButton>
                    <BaseButton type='button' size='large' variant='transparent'>Continue with
                        Apple</BaseButton>

                </div>
                {!isSignup && <div className='text-xs text-[#4A4A4A] w-full text-center '>
                    Don't have an account? <Link
                    to="/authentication/sign-up"
                    className="ml-1 cursor-pointer text-[#0D0D0D] underline-offset-2 underline font-medium"
                >
                    Create one
                </Link>
                </div>}
            </div>

        </div>
    </div>
}