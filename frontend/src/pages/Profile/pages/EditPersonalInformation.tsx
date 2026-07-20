import {Link, useRevalidator, useRouteLoaderData} from "react-router-dom";
import type {User} from "../../../types/user.ts";
import type {SubmitEvent} from "react";
import {LockKeyhole} from "lucide-react";
import {notificationAction} from "../../../store/ui-slice.tsx";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {updateUserInfo} from "../../../utils/http.ts";

export default function EditPersonalInformation() {
    const user = useRouteLoaderData("profile") as User;
    const dispatch = useDispatch();
    const {revalidate} = useRevalidator();

    const {mutate} = useMutation({
        mutationFn: updateUserInfo,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully updated'));
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'User updated successfully',
            }))
        },
        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message,
            }))
        }
    });
    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fields = {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            lastName: user.lastName,
            password: ''

        };

        const useNewInfo = Object.fromEntries(
            Object.entries(fields)
                .filter(([key, value]) => {
                    const newValue = formData.get(
                        key
                    )
                    console.log(newValue && newValue !== value)
                    return newValue && newValue !== value;
                }).map(([key]) => {
                const newValue = formData.get(
                    key
                )
                return [key, newValue];
            })
        );
        console.log(useNewInfo);
        if ("email" in useNewInfo && !useNewInfo.password) {
            dispatch(notificationAction.showNotification({
                status: 'warning',
                title: 'Warning',
                message: 'To change your email, confirm your current password.',
            }));
            return;
        }
        if (Object.keys(useNewInfo).length === 0) {
            dispatch(notificationAction.showNotification({
                status: 'info',
                title: 'Information',
                message: 'Nothing was changed. Please change some information and try again',
            }));
            return;
        }
        mutate(useNewInfo)
    }
    return <form onSubmit={onSubmit} className='border border-[#0b0b0b]/10 overflow-hidden rounded-[10px] mb-2.5'>
        <div
            className='overflow-hidden  py-2 bg-[#fcfcfb] border-[#0b0b0b]/10  px-4 border-b '>
            <div>
                <h1 className='text-sm font-medium'>Edit personal information</h1>
                <p className='text-xs text-[#898781]'>Changes save immediately</p>
            </div>

        </div>

        <div className='grid grid-cols-2 gap-2.5 mb-4 px-4 py-2.5'>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name' className='block text-[11px] font-medium '>First name</label>
                <input
                    defaultValue={user.name}
                    required name='name' id='name' type='text'
                    className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='block text-[11px] font-medium ' htmlFor='lastName'>Last name</label>
                <input
                    defaultValue={user.lastName} required name='lastName' id='lastName' type='text'
                    className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
                <label className='block text-[11px] font-medium ' htmlFor='email'>Email address</label>
                <input
                    defaultValue={user.email} required name='email' id='email' type='email'
                    className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
                <label className='block text-[11px] font-medium ' htmlFor='phoneNumber'>Phone number</label>
                <input
                    required defaultValue={user.phoneNumber} name='phoneNumber' id='phoneNumber' type='text' placeholder='+(995) 555 55 55 55'
                    className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            </div>
            <div
                className='flex items-center gap-1.5 px-2.5 py-2 bg-[#fcfcfb] rounded-[6px] mb-2.5 text-[11px] col-span-2 text-[#52514e] border border-[#0b0b0b]/10'>
                <LockKeyhole size={10}/>
                <span>To change your email, confirm your current password below
</span>
            </div>
            <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor='password' className='block text-[11px] font-medium '>
                    <strong>Current password</strong> (only needed if changing email)
                </label>
                <input
                    placeholder='Enter your password'
                    name='password' id='password' type='text'
                    className='w-full h-9 px-3 py-2  text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            </div>

        </div>
        <div className='border-t px-4 py-2.5 border-[#0b0b0b]/10 flex text-xs items-center justify-end gap-2 pt-3.5'>
            <Link to='/profile'
                  className='px-4 py-2 bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer font-medium'>
                Cancel
            </Link>
            <button
                className='px-4 py-2 bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer font-medium'>Save
                changes
            </button>


        </div>
    </form>

}