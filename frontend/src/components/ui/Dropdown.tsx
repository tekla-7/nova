import {ChevronDown} from 'lucide-react';
import {type ReactNode, useState} from "react";
import type {SortOption} from "../../types/sortOption.ts";

type Props = {
    title: string;
    options: SortOption[];
    onChange:(value: SortOption) => void;
    children?: ReactNode;
}

export default function Dropdown({title,options,onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    function toggleOpen() {
        setIsOpen(v => !v)
    }

    return <div className='relative border rounded border-[#E5E0D8] bg-white min-w-44 text-[#0D0D0D] text-xs'>
        <div onClick={toggleOpen} className=' tracking-[.08em] cursor-pointer uppercase  py-2.5 px-3 flex items-center justify-between gap-2'>
            <span>{title}</span>
            <ChevronDown size={11}/>
        </div>
        <div
            className={`mt-1 right-0 w-full overflow-hidden transition-all bg-white border rounded border-[#E5E0D8] duration-300 ease-in-out absolute ${
                isOpen
                    ? "opacity-100 translate-y-0 scale-100 visible"
                    : "opacity-0 -translate-y-2 scale-95 invisible"
            }`}>
            <ul className='px-1 py-3'>
                {options?.map(option => (
                    <li onClick={() => {
                        onChange(option)
                        toggleOpen()
                    }} className='py-1 px-1.5 rounded w-full cursor-pointer hover:bg-[#F5F3EE]'
                        key={option.title}>{option.title}</li>
                ))}
            </ul>
        </div>
    </div>
}