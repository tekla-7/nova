import type {Ref} from "react";
import {createPortal} from "react-dom";
type Props = {
    ref: Ref<HTMLDialogElement>;
    onClose: () => void;
};

export default function FailedModal({ ref ,onClose }: Props) {
    return createPortal(
        <dialog
            ref={ref}
            className="
    fixed
    open:flex flex-col items-center
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-3/5
    max-w-xl
    p-6
    rounded-lg
    border-0
    shadow-2xl
    z-50
    backdrop:bg-gray-400/50
    backdrop:backdrop-blur-sm
  ">
            <div
                className="w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center border-[#d03b3b] bg-[#fad6d6] mt-3 mb-5">
                <p className='text-3xl'>❌</p>
            </div>
            <h1 className='text-[#8e2626] text-center text-sm font-medium mb-1'>Payment failed</h1>
            <h2 className='text-center text-xs text-[#898781] mb-3.5'>Face ID not recognised.<br/>Try again or use a different method.</h2>
      <button className='px-4 py-2 border text-[14px] border-[#0b0b0b]/20 rounded-lg cursor-pointer' type='button' onClick={onClose}>Use a different payment method</button>
        </dialog>,
        document.getElementById("modal")!
    );
}