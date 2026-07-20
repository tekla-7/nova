import {Form, useActionData, useNavigation} from "react-router-dom";
import BaseButton from "../../components/ui/BaseButton.tsx";

type ActionData = {
    message?: string;
    errors?: Record<string, string>;
};
export default function Register() {
    const data = useActionData<ActionData>()
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return <Form className='flex flex-col gap-3 w-full ' method='post'>
        <div className='grid grid-cols-2 gap-2.5'>
            <div>
                <label className='text-[13px] font-medium mb-1' htmlFor='name'>First name</label>
                <input
                    name='name' autoComplete='name'
                    className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                    id='name' type='text' placeholder='first name' required/>
            </div>
            <div>
                <label className='text-[13px] font-medium mb-1' htmlFor='lastName'>Last name</label>
                <input
                    name='lastName' autoComplete='lastName'
                    className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                    id='lastName' type='text' placeholder='last name' required/>
            </div>
        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='email'>Email</label>
            <input
                name='email' autoComplete='email'
                className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                id='email' type='email' placeholder='your@example.com' required/>
        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='number'>Phone number</label>
            <input
                name='phoneNumber' autoComplete='phoneNumber'
                className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                id='number' type='text' placeholder='+(995) 555 55 55 55' required/>
        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='password'>Password</label>
            <input name='password' autoComplete="current-password"

                   className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                   id='password' type='password' required placeholder='min 6 characters'/>

        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='confirmPassword'>Confirm password</label>
            <input name='confirmPassword' autoComplete="confirmPassword"

                   className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                   id='confirmPassword' type='password' required placeholder='.......'/>
        </div>
        <div className='flex items-center gap-2'>
            <input className="
    appearance-none
    w-3.5 h-3.5
    border border-[#E5E0D8]
    rounded-[3px]
    checked:bg-[#0D0D0D]
    checked:border-[#0D0D0D]
    cursor-pointer
  " type='checkbox' required name='privacyPolicy' id='privacyPolicy'

            />
            <label className='cursor-pointer text-[#898781] text-xs' htmlFor='privacyPolicy'>I agree to the <span
                className='text-[#0b0b0b
] underline-offset-2 underline'>Terms of
                Service </span>and <span className='text-[#0b0b0b
] underline-offset-2 underline'>Privacy Policy</span></label>
        </div>
        {data && data.errors && (
            <ul className='text-[10px] text-red-700'>
                {Object.values(data.errors).map((err, index) =>
                    (<li key={index}>{err}</li>)
                )}
            </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <BaseButton type='submit' size='large'>{isSubmitting ? 'submitting' : 'Sign in'}</BaseButton>
    </Form>
}