import BaseButton from "../../components/ui/BaseButton.tsx";
import {Form, useActionData, useNavigation} from "react-router-dom";
type ActionData = {
    message?: string;
    errors?: Record<string, string>;
};
function LoginPage() {
    const data = useActionData<ActionData>()
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return <Form className='flex flex-col gap-3 ' method='post'>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='email'>Email</label>
            <input
                name='email' autoComplete='email'
                className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                id='email' type='email' placeholder='your@example.com' required/>
        </div>
        <div>
            <label className='text-[13px] font-medium mb-1' htmlFor='password'>Password</label>
            <input name='password'   autoComplete="current-password"

                   className='w-full border border-[#E5E0D8] rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]'
                id='password' type='password' required placeholder='.......'/>
        </div>
        <p className='text-xs text-[#9A9A9A] w-full pb-1 text-right underline underline-offset-2 '><a
            href='/'>Forgot
            password?</a></p>
        {data && data.errors && (
            <ul  className='text-[10px] text-red-700'>
                {Object.values(data.errors).map((err, index) =>
                    (<li key={index}>{err}</li>)
                )}
            </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <BaseButton type='submit' size='large'>{isSubmitting ? 'submitting' : 'Sign in'}</BaseButton>
    </Form>
}

export default LoginPage