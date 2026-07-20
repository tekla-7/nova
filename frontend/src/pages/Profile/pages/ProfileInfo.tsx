import {Link, useRouteLoaderData} from "react-router-dom";
import type {User} from "../../../types/user.ts";
import {SquarePen } from 'lucide-react';

export default function ProfileInfo() {
    const user = useRouteLoaderData("profile") as User;
    const month = () => {
        const today = new Date();
        const passwordChangeAt = new Date(user?.lastPasswordChangeAt);
        const differentMonth = today.getMonth() - passwordChangeAt.getMonth();
        if (differentMonth < 1 || isNaN(differentMonth)) return 'Last changed less then 1 months ago'
        return `Last changed ${differentMonth}  months ago`

    }
    return <>
        <div className='border border-[#0b0b0b]/10 overflow-hidden rounded-[10px] mb-2.5'>
            <div
                className='flex items-center overflow-hidden  justify-between py-2 bg-[#fcfcfb] border-[#0b0b0b]/10  px-4 border-b '>
                <div>
                    <h1 className='text-sm font-medium'>Personal information</h1>
                    <p className='text-xs text-[#898781]'>Your name, email and phone</p>
                </div>
                <Link to='edit'
                    className='py-2 px-4 text-sm bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer font-medium flex items-center gap-1'>
                    <SquarePen size={12}/>
                    Edit
                </Link>
            </div>
            <ul className='px-4 py-2.5'>
                <li className='flex items-center gap-1 justify-between py-1.5 border-b border-[#0b0b0b]/10'>
                    <span className='text-[11px] text-[#898781]'>First name</span>
                    <span className='text-[13px]'>{user.name}</span>
                </li>
                <li className='flex items-center gap-1 justify-between py-1.5 border-b border-[#0b0b0b]/10'>
                    <span className='text-[11px] text-[#898781]'>Last name</span>
                    <span className='text-[13px]'>{user.lastName}</span>
                </li>
                <li className='flex items-center gap-1 justify-between py-1.5 border-b border-[#0b0b0b]/10'>
                    <span className='text-[11px] text-[#898781]'>Email</span>
                    <span className='text-[13px]'>{user.email}</span>
                </li>
                <li className='flex items-center gap-1 justify-between py-1.5 '>
                    <span className='text-[11px] text-[#898781]'>Phone</span>
                    <span className='text-[13px]'>{user.phoneNumber}</span>
                </li>
            </ul>
        </div>
        <div className='border border-[#0b0b0b]/10 overflow-hidden rounded-[10px] mb-2.5'>
            <div
                className='flex items-center overflow-hidden  justify-between py-2 bg-[#fcfcfb] border-[#0b0b0b]/10  px-4 border-b '>
                <div>
                    <h1 className='text-sm font-medium'>Password</h1>
                    <p className='text-xs text-[#898781]'>{month()}</p>
                </div>
                <Link to='password/edit'
                    className='py-2 px-4 text-sm bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer font-medium flex items-center gap-1'>
                    <SquarePen size={12}/>
                    Change
                </Link>
            </div>
            <ul className='px-4 py-2.5'>
                <li className='flex items-center gap-1 justify-between py-1.5 '>
                    <span className='text-[11px] text-[#898781]'>First name</span>
                    <span className='text-[15px] flex items-center font-semibold text-[#898781]'>
                         {"•".repeat(6)}

                </span>
                </li>
            </ul>

        </div>

    </>
    // return <form>
    //     <h1 className='text-base font-medium mb-4'>Personal information</h1>
    //     <div className='grid grid-cols-2 gap-2.5 mb-4'>
    //         <div className='flex flex-col gap-1'>
    //             <label htmlFor={'name'} className='block text-[11px] font-medium '>First name</label>
    //             <input
    //                 defaultValue={user.name}
    //                 required name='name' id='name' type='text'
    //                 className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //         <div className='flex flex-col gap-1'>
    //             <label className='block text-[11px] font-medium ' htmlFor='lastName'>Last name</label>
    //             <input
    //                 defaultValue={user.lastName} required name='lastName' id='lastName' type='text'
    //                 className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //         <div className='flex flex-col gap-1 col-span-2'>
    //             <label className='block text-[11px] font-medium ' htmlFor='email'>Email address</label>
    //             <input
    //                 defaultValue={user.email} required name='email' id='email' type='email'
    //                 className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //         <div className='flex flex-col gap-1 col-span-2'>
    //             <label className='block text-[11px] font-medium ' htmlFor='phone_number'>Phone number</label>
    //             <input
    //                 required defaultValue={user.phoneNumber} name='phone_number' id='phone_number' type='text'
    //                 className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //     </div>
    //
    //     <h1 className='text-base mt-2 font-medium mb-4'>Change password</h1>
    //     <div className='grid  gap-2.5 mb-4'>
    //         <div className='flex flex-col grid-cols-2 gap-1'>
    //             <label className='block text-[11px] font-medium ' htmlFor='current_password'>Current password</label>
    //             <input
    //                 required name='current_password' id='current_password' type='text'
    //                 className='w-full h-9 px-3 py-2 text-base border col-span-2 border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //         <div className='flex flex-col gap-1'>
    //             <label className='block text-[11px] font-medium  ' htmlFor='new-password'>New password</label>
    //             <input
    //                 name='new-password' id='new-password' type='text'
    //                 className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //         <div className='flex flex-col gap-1 '>
    //             <label className='block text-[11px] font-medium ' htmlFor='current_password'>Confirm password
    //             </label>
    //             <input
    //                 name='confirm-password' id='confirm-password' type='text'
    //                 className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
    //         </div>
    //     </div>
    //
    // </form>;
}