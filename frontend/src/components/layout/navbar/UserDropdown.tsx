import {User} from 'lucide-react';
import {type Ref} from "react";
import {LogOut} from 'lucide-react';
import {Package} from 'lucide-react';
import {Link} from "react-router-dom";
import {useUserData} from "../../../hooks/useUserData.ts";
import {isAuthenticated} from "../../../utils/auth.ts";
import {queryClient} from "../../../routes/router.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {uiAction} from "../../../store/ui-slice.tsx";

export default function UserDropdown({ref}: { ref: Ref<HTMLDivElement> }) {
    const isOpen = useSelector(
        (state: RootState) => state.ui.isUserOpen
    );
    const {data: user} = useUserData();
    const isUserLogin: boolean = isAuthenticated();
    const userName = isUserLogin && user ? user?.name + ' ' + user?.lastName : ''
    const dispatch = useDispatch();


    function toggleOpen() {
        dispatch(uiAction.toggle('isUserOpen'))
    }

    async function signOut() {
        localStorage.removeItem('access_token');
        await queryClient.invalidateQueries({
            queryKey: ["userCartData"],
            refetchType: "all",
        });

        await queryClient.invalidateQueries({
            queryKey: ["userWishlist"],
            refetchType: "all",
        });
        await queryClient.invalidateQueries({
            queryKey: ["userData"],
            refetchType: "all",
        });
        toggleOpen()
    }

    return <div className='relative' ref={ref}>
        <User onClick={toggleOpen} size={18} className='cursor-pointer'/>
        <div
            className={`absolute top-12 -right-2 w-[240px] rounded-[10px] border border-[#E5E0D8] bg-white
  transition-all duration-300 ease-out
  ${
                isOpen
                    ? "opacity-100 translate-y-0 scale-100 visible"
                    : "opacity-0 -translate-y-2 scale-95 invisible"
            }`}>
            {isUserLogin && <>
                <div className='flex border-b border-[#F0EDE8]  items-center gap-2.5 py-4 px-5'>
                    <div
                        className='bg-[#0D0D0D] w-9 h-9 rounded-full text-white text-[13px]  shrink-0 flex items-center justify-center uppercase'>
                        {userName.split(' ').map(e => e.slice(0, 1)).join('')}
                    </div>
                    <div>
                        <p className='text-[13px]'>{userName}</p>
                        <p className='text-[#9A9A9A] text-[11px]'>'{user?.email}'</p>
                    </div>
                </div>
                <Link to='profile'
                      onClick={toggleOpen}
                      className=' text-[13px] w-full text-[#4A4A4A] cursor-pointer flex items-center gap-2.5 px-4 py-2.5'>
                    <User size={13}/>
                    <p>My profile</p>
                </Link>
                <Link to='profile/order'
                      onClick={toggleOpen}
                      className='border-b w-full border-[#F0EDE8]  text-[13px] text-[#4A4A4A] cursor-pointer flex items-center gap-2.5 px-4 pt-1.5 pb-2.5'>
                    <Package size={13}/>
                    <p>My orders</p>
                </Link>
                <button onClick={signOut}
                        className='text-[13px] text-[#D63B3B] cursor-pointer flex items-center gap-2.5 px-4 py-2.5'>
                    <LogOut size={13}/>
                    <p>Sign out</p>
                </button>
            </>
            }
            {!isUserLogin && <div className='p-4 flex items-center flex-col'>
                <p className='text-[13px] pb-2.5'>Sign in for faster checkout</p>
                <Link to="/authentication"
                      className='text-sm px-4 text-center py-2 bg-transparent text-[#0b0b0b] border w-full border-[#0b0b0b33] rounded-lg cursor-pointer mb-2'>Sign
                    in
                </Link>
                <Link to='/authentication/sign-up'
                      className='text-sm px-4 py-2 bg-transparent text-center text-[#0b0b0b] w-full border border-[#0b0b0b33] rounded-lg cursor-pointer mb-2'>
                    Create account
                </Link>
            </div>}
        </div>
    </div>


}
