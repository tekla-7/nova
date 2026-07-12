import BaseButton from "../../../../components/ui/BaseButton.tsx";
import {ArrowRight} from "lucide-react";
import FailedModal from "./FailedModal.tsx";
import { useRef} from "react";

export default function PayPal() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const applePaySession=()=>{
        dialogRef.current?.showModal()
        const appleSession = (window as any).ApplePaySession;

        if (appleSession) {
            return appleSession.canMakePayments();
        }
        return false;
    }

    return <>
        <FailedModal ref={dialogRef}   onClose={() => dialogRef.current?.close()}/>
        <div className='bg-[#fcfcfb] border border-[#0b0b0b]/10 rounded-[10] p-5 text-center mt-2.5'>
        <div className='text-3xl mb-2.5'>🅿️</div>
        <h1 className='text-sm font-medium mb-1'>You'll be redirected to PayPal</h1>
        <p className='text-xs text-[#898781] leading-relaxed pb-3.5'> After clicking the button below, you'll leave NOVA
            and go to PayPal's secure checkout. Once you complete payment there, you'll be automatically returned here
            with your order confirmed.
            <br/><br/>
            <span className='text-[#0b0b0b] font-medium'>No card details needed on this page.</span>
        </p>
        <BaseButton type='button' onClick={applePaySession} size='large' variant='transparent' >

            <span className='w-full flex items-center justify-center'> Continue to payment <ArrowRight className='pl-1 pt-1' size={18}/></span>


        </BaseButton>
    </div></>
}