import {NavLink} from "react-router-dom";
import { House} from 'lucide-react';
import {Search} from 'lucide-react'
import UserDropdown from "./    UserDropdown.tsx";
import BagDropdown from "./BagDropdown.tsx";
import WishlistDropdown from "./WishlistDropdown.tsx";

function Navbar() {
    return (
        <nav className="border-b-1 py-3.5 border-[#E5E0D8] px-6 flex items-center justify-between sticky top-0 z-10 bg-white">
        <NavLink className="flex items-center cursor-pointer" to='/frontend/public'><House size={20}/> <span
            className='text-gray-900 text-2xl tracking-wider pb-1'>Nova</span></NavLink>
        <ul className='text-[#4A4A4A] text-[16px] flex items-center'>
            <li className='py-1 px-3 cursor-pointer'><NavLink
                className={({isActive}) => isActive ? 'text-gray-900 decoration-gray-900 underline  underline-offset-8' : undefined}
                to='women'>Women</NavLink></li>
            <li className='py-1 px-3 cursor-pointer'><NavLink
                className={({isActive}) => isActive ? 'text-gray-900 decoration-gray-900 underline  underline-offset-8' : undefined}
                to='men'>Men</NavLink></li>

            <li className='py-1 px-3 cursor-pointer'><NavLink
                className={({isActive}) => isActive ? 'text-gray-900 decoration-gray-900 underline  underline-offset-8' : undefined}
                to='new-in'>New In</NavLink></li>

            <li className='py-1 px-3 cursor-pointer'><NavLink
                className={({isActive}) => isActive ? 'text-gray-900 decoration-gray-900 underline  underline-offset-8' : undefined}
                to='sale'>Sale</NavLink></li>

        </ul>
            <ul className="text-[#4A4A4A] text-[16px] flex items-center">
                <li className='py-1 px-3 cursor-pointer'><Search size={18}/></li>
                <li className='py-1 px-3 cursor-pointer'><WishlistDropdown/></li>

                <li className='py-1 px-3 cursor-pointer'>
                    <BagDropdown/>
                </li>
                <li className='py-1 px-3 cursor-pointer'><UserDropdown/></li>
            </ul>
        </nav>)
}

export default Navbar;