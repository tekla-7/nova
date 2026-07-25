import {Link, useRouteLoaderData} from "react-router-dom";
import type {User} from "../../../types/user.ts";
import {SquarePen} from 'lucide-react';
import ErrorMessage from "../../../components/ui/ErrorMessage.tsx";

export default function ProfileInfo() {
    const {user, error} = useRouteLoaderData("profile") as {
        user: User | null;
        error: { message: string } | null;
    };
    if (error) {
        return <ErrorMessage message={error.message}/>;
    }

    if (!user) {
        return null;
    }
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

}