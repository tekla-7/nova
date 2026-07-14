import clsx from "clsx";
import type {Addresses} from "../../../../types/user.ts";

type Props = {
    address: Addresses,
    isSelected: boolean,
    onClick: () => void,
}
export default function ShoppingAddressItem({address, isSelected, onClick}: Props) {
    return <button
        type='button'
        onClick={onClick}
        className={clsx(
            "flex flex-col h-[-webkit-fill-available] rounded-[8px] p-3 border cursor-pointer transition-all duration-200 ease-in-out",
            {
                'border-[#0b0b0b]/40': isSelected,
                'border-[#0b0b0b]/10': !isSelected,
            }
        )}>
        <div className='flex items-start justify-between gap-1'>
            <p className='text-[13px] text-left font-medium pb-0.5'>{address.name} {address.lastName}</p>
            <input type='radio' checked={isSelected} readOnly={true}
                   className={clsx(
                       "w-4 h-4 accent-[#0b0b0b]",
                       {
                           "border-[#0b0b0b]/40": isSelected,
                           "border-[#0b0b0b]/10": !isSelected,
                       }
                   )}/>
        </div>
        {address.isDefault && <div className='w-fit text-[9px] font-semibold inline-block uppercase bg-[#fcfcfb] border border-[#0b0b0b]/10 text-[#898781
] py-[1px] px-1.5 rounded-[20px] tracking-wider mb-1.5'>default</div>}
        <p className='text-[11px] text-left text-[#52514e] leading-normal'>{address.streetAddress} <br/> {address.city.name} {address.zipCode} <br/>{address.country.name}</p>

    </button>
}