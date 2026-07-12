import type {InputHTMLAttributes} from "react";

type Props = {
    defaultChecked?: boolean;
} & InputHTMLAttributes<HTMLInputElement>
export default function Checkbox({defaultChecked, ...props}: Props) {
    return <input className="
    appearance-none
    w-3.5 h-3.5
    rounded-[3px]
    border border-[#E5E0D8]
    checked:bg-[#0D0D0D]
    checked:border-[#0D0D0D]
    checked:after:content-['✓']
    checked:after:text-white
    checked:after:text-[10px]
    checked:after:flex
    checked:after:items-center
    checked:after:justify-center mr-2.5
  " type='checkbox' {...props}
                  defaultChecked={defaultChecked}
    />
}