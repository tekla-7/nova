import PasswordInput from "../../../components/ui/PasswordInput.tsx";
import {Link, useNavigate} from "react-router-dom";
import {isEqualsToOtherValue} from "../../../utils/validation.ts";
import {useDispatch} from "react-redux";
import {uiAction as notificationAction} from "../../../store/ui-slice.tsx";
import {useActionState} from "react";
import type {NewPassword} from "../../../types/user.ts";
import {updatePassword} from "../../../utils/http.ts";

export default function EditPassword() {
    const dispatch = useDispatch();
const navigate=useNavigate()
    async function passwordChangeAction(_: NewPassword | null, formData: FormData) {
        if (!formData) return null;
        const data = Object.fromEntries(formData.entries()) as NewPassword

        if (!isEqualsToOtherValue(data.newPassword, data.confirmPassword)) {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Passwords do not match',
            }))
            return data
        }
        try {
            await updatePassword({newPassword:data.newPassword ,currentPassword:data.currentPassword})
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Password updated successfully',
            }))
            navigate('/profile')
            return null
        } catch (error:any) {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error?.message,
            }))
            return data
        }

    }

    const [formState, formAction] = useActionState(passwordChangeAction, null,)

    return <form action={formAction} className='border border-[#0b0b0b]/10 overflow-hidden rounded-[10px] mb-2.5'>
        <div
            className='overflow-hidden  py-2 bg-[#fcfcfb] border-[#0b0b0b]/10  px-4 border-b '>
            <div>
                <h1 className='text-sm font-medium'>Change password</h1>
                <p className='text-xs text-[#898781]'>You must enter your current password to set a new one</p>
            </div>

        </div>

        <div className='grid grid-cols-1 gap-2.5 mb-4 px-4 py-2.5'>
            <div className='flex flex-col  pb-2.5 border-b border-[#0b0b0b]/10'>
                <label htmlFor='currentPassword' className='block mb-1 text-[11px] font-medium '>Current
                    password</label>
                <input
                    defaultValue={formState?.currentPassword}
                    required name='currentPassword' id='currentPassword' type='text'
                    className='w-full h-9 px-3 py-2 mb-1 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
                <p className='text-[10px] text-[#898781]'>We need this to verify it's really you
                </p>
            </div>
            <PasswordInput defaultValue={formState?.newPassword}
                           placeholder='Min 8 characters' id='newPassword' label='New password' name='newPassword'/>
            <div className='flex flex-col gap-1 '>
                <label className='block text-[11px] font-medium ' htmlFor='confirmPassword'>Confirm new password
                </label>
                <input
                    defaultValue={formState?.confirmPassword}

                    placeholder='Repeat new password'
                    required name='confirmPassword' id='confirmPassword' type='text'
                    className='w-full h-9 px-3 py-2 text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            </div>

            <ul
                className='px-2.5 py-2 bg-[#fcfcfb] rounded-[6px] text-[11px] col-span-2  border border-[#0b0b0b]/10'>
                <span className='block !text-[11px] font-medium '>Password requirements:</span>
                <li className='text-[#52514e]'>· Minimum 8 characters</li>
                <li className='text-[#52514e]'>· At least one uppercase letter</li>
                <li className='text-[#52514e]'>· At least one number</li>
                <li className='text-[#52514e]'>· At least one special character (!@#$...)
                </li>
            </ul>


        </div>
        <div className='border-t px-4 py-2.5 border-[#0b0b0b]/10 flex text-xs items-center justify-end gap-2 pt-3.5'>
            <Link to='/profile'
                  className='px-4 py-2 bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer font-medium'>
                Cancel
            </Link>
            <button
                className='px-4 py-2 bg-transparent text-[#0b0b0b] border border-[#0b0b0b]/20 rounded-lg cursor-pointer font-medium'>Update
                password
            </button>


        </div>
    </form>


}