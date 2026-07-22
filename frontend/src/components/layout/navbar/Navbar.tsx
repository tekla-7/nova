import {NavLink} from "react-router-dom";
import {House} from 'lucide-react';
import UserDropdown from "./UserDropdown.tsx";
import BagDropdown from "./BagDropdown.tsx";
import WishlistDropdown from "./WishlistDropdown.tsx";
import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {uiAction} from "../../../store/ui-slice.tsx";

function Navbar() {
    const wishlistRef = useRef<HTMLDivElement>(null);
   const bagRef = useRef<HTMLDivElement>(null);
   const userRef=useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                wishlistRef.current &&bagRef.current&&userRef.current&&
                !wishlistRef.current.contains(event.target as Node)&& !bagRef.current.contains(event.target as Node)&& !userRef.current.contains(event.target as Node)

            ) {
                dispatch(uiAction.modalClose());
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    return (
        <nav
            className="border-b-1 py-3.5 border-[#E5E0D8] px-6 flex items-center justify-between sticky top-0 z-10 bg-white">
            <NavLink className="flex items-center cursor-pointer" to='/'><House size={20}/> <span
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
                {/*<li className='py-1 px-3 cursor-pointer'><Search size={18}/></li>*/}
                <li className='py-1 px-3 cursor-pointer'><WishlistDropdown ref={wishlistRef}/></li>

                <li className='py-1 px-3 cursor-pointer'>
                    <BagDropdown ref={bagRef}/>
                </li>
                <li className='py-1 px-3 cursor-pointer'><UserDropdown ref={userRef}/></li>
            </ul>
        </nav>)
}

export default Navbar;