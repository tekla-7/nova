import type {ShoppingMethod} from "../../../../types/checkout.ts";
import clsx from "clsx";
type Props={
    shoppingMethod: ShoppingMethod,
    isSelected: boolean,
    onMethodChange:() => void,
}
export default function ShoppingMethodItem({shoppingMethod, isSelected ,onMethodChange }: Props) {
    return <button
        type='button'
        onClick={onMethodChange}
        className={clsx(
        "flex items-center gap-2.5 rounded-[8px] p-3 border cursor-pointer transition-all duration-200 ease-in-out",
        {
            'border-[#0b0b0b]/40': isSelected,
            'border-[#0b0b0b]/10': !isSelected,
        }
    )}>
        <input type='radio' checked={isSelected} readOnly={true}
               className={clsx(
                   "w-4 h-4 accent-[#0b0b0b]",
                   {
                       "border-[#0b0b0b]/40": isSelected,
                       "border-[#0b0b0b]/10": !isSelected,
                   }
               )}/>
        <div>
            <p className='text-[13px] text-left font-medium pb-0.5'>{shoppingMethod.title}</p>
            <p className='text-[11px] text-left text-[#898781]'>{shoppingMethod.description}</p>
        </div>
        <span className={clsx('ml-auto text-[13px] font-medium ', {
            'text-[#006300]': shoppingMethod.price === 0
        })}>
            {shoppingMethod.price === 0&&'Free'}
            {shoppingMethod.price !== 0&&`$${shoppingMethod.price}.00`}
        </span>
    </button>
}