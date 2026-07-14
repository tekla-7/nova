import {ApplePayIcon} from "../../../../components/ui/ApplePayIcon.tsx";
import ApplePayModal from "./ApplePayModal.tsx";
import {useRef, useState} from "react";

export default function ApplePay() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const applePaySession = () => {
        const appleSession = (window as any).ApplePaySession;

        if (appleSession) {
            return appleSession.canMakePayments();
        }
        dialogRef.current?.showModal();
        setIsOpen(true)
        return false;
    }
    const onCancel = () => {
        setIsOpen(false)
        dialogRef.current?.close()
    }
    return <>
        <ApplePayModal ref={dialogRef} isOpen={isOpen} onClose={onCancel}/>
        <div className='bg-[#fcfcfb] border border-[#0b0b0b]/10 rounded-[10] p-5 text-center mt-2.5'>
            <div className='text-3xl mb-2.5'>🍎</div>
            <h1 className='text-sm font-medium mb-1'>Pay with Apple Pay</h1>
            <p className='text-xs text-[#898781] leading-relaxed pb-3.5'> A system dialog will appear. Confirm with your
                fingerprint or face — payment is instant. No card number needed. Your payment info stays on your device,
                never shared with NOVA.
                <br/><br/>
                <span
                    className='text-[#0b0b0b] font-medium'>Address and shipping are already filled from your Apple Wallet.</span>
            </p>

            <button onClick={applePaySession}
                    className="w-full cursor-pointer inline-flex items-center justify-center gap-1 bg-black hover:bg-neutral-800 text-white font-medium text-sm py-1.5 px-3 rounded transition-colors duration-200">
                <ApplePayIcon className="w-auto" height={22}/>

            </button>
            <p className='text-[11px] text-[#898781] pt-2.5'>Only available on Safari · macOS / iOS</p>
        </div>
    </>
}