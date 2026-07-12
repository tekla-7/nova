import BaseButton from "../../../components/ui/BaseButton.tsx";
import {useRef} from "react";

export default function Subscribe() {
    const mailRef = useRef<HTMLInputElement>(null);
    function subscribe() {

            if (!mailRef.current) return;

            const email = mailRef.current.value;

            console.log(email);

            mailRef.current.value = '';
    }
    return <div className='bg-[#F5F3EE] rounded-xl p-7 text-center mb-6 mx-6 border border-[#E5E0D8]'>
        <h1 className='text-[20px] mb-1.5'>Stay in the loop</h1>
        <p className='text-[#4A4A4A] pb-4.5 text-[13px]'>New drops, exclusive deals, and style guides — straight to your
            inbox.</p>
        <div className='flex items-center justify-center gap-2 mx-auto mb-2.5'>
            <input  type="email"
                    required ref={mailRef} minLength={4} className='max-w-[380px] w-2/3 py-2 h-9 px-3.5 bg-white border border-[#E5E0D8] rounded text-[13px]'/>
            <BaseButton onClick={subscribe}>Subscribe</BaseButton>
        </div>
        <p className='text-[#9A9A9A] text-[11px] '>Unsubscribe anytime.</p>
    </div>
}