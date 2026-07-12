import {type ReactNode, useState} from "react";
import {ChevronDown} from 'lucide-react';

type Props = {
    title: string;
    children: ReactNode;
    hasBorder?: boolean;
}

export default function Panel({title, children ,hasBorder=true}: Props) {
    const [isOpen, setIsOpen] = useState(true);

    function toggleOpen() {
        setIsOpen(v => !v)
    }

    return <div className={`relative ${hasBorder ? 'border-b border-[#E5E0D8]' : undefined}`}>
        <div onClick={toggleOpen} className='text-[11px] tracking-[.08em] cursor-pointer uppercase text-[#0D0D0D] py-2.5 flex items-center justify-between'>
            <span>{title}</span>
            <ChevronDown size={11}/>
        </div>
        <div  className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
        }`}>{children}</div>
    </div>
}