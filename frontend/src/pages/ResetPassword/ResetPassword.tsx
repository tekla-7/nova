import {Form, useActionData} from "react-router-dom";
import type {ActionData} from "../../types/auth.ts";
import PasswordInput from "../../components/ui/PasswordInput.tsx";
import BaseButton from "../../components/ui/BaseButton.tsx";

export default function ResetPassword() {
    const data = useActionData<ActionData>()
    return <Form className='flex flex-col gap-3 w-full ' method='post'>

        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='email'>Email</label>
            <input
                name='email' autoComplete='email'
                className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                id='email' type='email' placeholder='your@example.com' required/>
        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='recoveryPhrase'> Recovery Phrase</label>
            <input name='recoveryPhrase' autoComplete="recoveryPhrase"
                   minLength={3}
                   className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                   id='recoveryPhrase' type='text' required placeholder='.......'/>
        </div>

        <div>
            <PasswordInput inputSize='large' label={'Password'} id={'password'} type='password' required
                           name='password'
                           placeholder='enter your password'/>
        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='confirmPassword'>Confirm password</label>
            <input name='confirmPassword' autoComplete="confirmPassword"

                   className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                   id='confirmPassword' type='password' required placeholder='.......'/>
        </div>


        {data && data.message && <p className='text-xs'>{data.message}</p>}
        <BaseButton type='submit' size='large'>Submit</BaseButton>

    </Form>
}