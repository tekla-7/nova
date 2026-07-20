import {NavLink, useLoaderData} from "react-router-dom";
import type {User} from "../../../types/user.ts";
import {User as UserIcon ,MapPinHouse ,Package ,Bell } from 'lucide-react';

export default function SideBar() {
    const user = useLoaderData<User>();

    return <div className='h-full w-[200px] border-[#0b0b0b]/10 border-r px-3.5 py-5 flex flex-col gap-0.5'>
        <div
            className='w-[53px] h-[52px] uppercase rounded-full bg-[#0b0b0b] text-white flex items-center justify-center text-base font-medium mb-2.5'>
            {user.name.slice(0, 1)}{user.lastName?.slice(0, 1)}
        </div>
        <h1 className='text-sm font-medium mb-0.5'>{user.name} {user.lastName}</h1>
        <h2 className='text-xs text-[#898781] mb-4'>{user.email}</h2>
        <ul>
            <li className='py-2 px-2.5 cursor-pointer  text-xs '><NavLink
                className={({isActive}) => isActive ? ' font-medium bg-[#fcfcfb] gap-2 flex items-center' : ' flex gap-2 items-center text-[#52514e]'}
                to='/profile' end> <UserIcon size={12}/>
                Profile info</NavLink></li>
            <li className='py-2 px-2.5 cursor-pointer  text-xs '><NavLink
                className={({isActive}) => isActive ? ' font-medium bg-[#fcfcfb] gap-2 flex items-center' : ' flex gap-2 items-center text-[#52514e]'}
                to='addresses'> <MapPinHouse size={12}/>
                Addresses</NavLink></li>
            <li className='py-2 px-2.5 cursor-pointer  text-xs '><NavLink
                className={({isActive}) => isActive ? ' font-medium bg-[#fcfcfb] gap-2 flex items-center' : ' flex gap-2 items-center text-[#52514e]'}
                to='orders'> <Package size={12}/>
                Orders</NavLink></li>
            <li className='py-2 px-2.5 cursor-pointer  text-xs '><NavLink
                className={({isActive}) => isActive ? ' font-medium bg-[#fcfcfb] gap-2 flex items-center' : ' flex gap-2 items-center text-[#52514e]'}
                to='notifications'> <Bell size={12}/>
                Notificarions</NavLink></li>
        </ul>
    </div>;
}