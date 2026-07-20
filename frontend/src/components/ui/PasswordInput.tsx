import {type ChangeEvent, type InputHTMLAttributes, useEffect, useRef, useState} from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    id: string,

}
export default function PasswordInput({label, id, ...prop}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [complete, setComplete] = useState<{
        hasInputValue: boolean,
        min8: boolean,
        oneUppercase: boolean,
        oneNumber: boolean,
        oneSpecialCharacter: boolean
    }>(
        {
            hasInputValue: false,
            min8: false,
            oneUppercase: false,
            oneNumber: false,
            oneSpecialCharacter: false
        }
    )
    const isValid = Object.values(complete).every(Boolean);

    useEffect(() => {
        inputRef.current?.setCustomValidity(
            isValid ? "" : "Password is not strong enough."
        );
    }, [isValid]);

    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setComplete({
            hasInputValue: value.trim().length > 0,
            min8: value.length >= 8,
            oneUppercase: /[A-Z]/.test(value),
            oneNumber: /\d/.test(value),
            oneSpecialCharacter: /[^A-Za-z0-9]/.test(value),
        });
    }

    const step = Object.entries(complete).filter(([, value]) => value).length;
    const text = () => {
        if (step === 5) return 'Strong ✓'
        if (step === 0) return 'Enter a new password'
        const text = step > 3 ? 'Good ' : 'Weak '
        if (!complete.min8) return 'Too short';
        if (!complete.oneUppercase) return text + 'add uppercase';
        if (!complete.oneNumber) return text + 'add numbers';
        if (!complete.oneSpecialCharacter) return text + 'add special characters';

    }
    return <>
        <div className='flex flex-col gap-1 col-span-2'>
            <label htmlFor={id} className='block text-[11px] font-medium '>
                {label}
            </label>
            <input
                {...prop}
                ref={inputRef}
                onChange={e => onInputChange(e)}
                id={id} type='text'
                className='w-full h-9 px-3 py-2  text-base border border-[#0b0b0b]/10 rounded-[6px] outline-none'/>
            <div className='flex gap-[3px] mt-1'>
                <div className={clsx('h-[3px] rounded-sm flex-1',
                    step >= 1 && step < 5 && 'bg-[#fab219]',
                    step === 5 ? 'bg-[#009300]' : 'bg-[#0b0b0b]/10'
                )}></div>
                <div className={clsx('h-[3px] rounded-sm flex-1',
                    step >= 3 && step < 5 && 'bg-[#fab219]',
                    step === 5 ? 'bg-[#009300]' : 'bg-[#0b0b0b]/10'
                )}></div>
                <div className={clsx('h-[3px] rounded-sm flex-1',
                    step >= 4 && step < 5 && 'bg-[#fab219]',
                    step === 5 ? 'bg-[#009300]' : 'bg-[#0b0b0b]/10'
                )}></div>
                <div className={clsx('h-[3px] rounded-sm flex-1',
                    step === 5 ? 'bg-[#009300]' : 'bg-[#0b0b0b]/10'
                )}></div>
            </div>
            <span className={clsx('text-[10px] ',
                step > 0 && step < 5 && 'text-[#fab219]',
                step === 5 ? 'text-[#009300]' : 'text-[#0b0b0b]/10'
            )}>
                {text()}
            </span>
        </div>
    </>
}