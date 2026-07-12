import {Plus} from 'lucide-react';
import {Minus} from 'lucide-react';

export default function Quantity({selectedQuantity, onSelectedQuantityChange, size = 'small'}: {
    selectedQuantity: number,
    onSelectedQuantityChange: (quantity: number) => void,
    size: 'large' | 'small' | 'medium',
}) {

    return <>
    {size !== 'large' &&
       ( <div className="font-medium uppercase text-[11px] text-[#0D0D0D] mb-2 ">
            quantity
        </div>)}
        <div className={`${size==='large'?'rounded-lg':'rounded-[4px]'}  mb-3.5 flex  items-center border border-[#E5E0D8] w-fit overflow-hidden`}>
            <button onClick={() => {
                if (selectedQuantity > 1) {
                    onSelectedQuantityChange(selectedQuantity - 1);
                }
            }}
                    className={`${size==='large'?'w-14 border-r border-[#E5E0D8]':'w-9 bg-[#F5F3EE]  border-none '}  h-9 flex items-center justify-center cursor-pointer `}>
                <Minus className='text-[#4A4A4A]' size={12}/>
            </button>
            <input value={selectedQuantity} min='1' onChange={(e) => {
                const value = Number(e.target.value);
                onSelectedQuantityChange(value)
            }} type='number'
                   className={`${size==='large'?'w-full':'w-11'} h-9  text-[14px] bg-white border-none focus:border-none outline-none text-center`}/>
            <button
                onClick={() => onSelectedQuantityChange(selectedQuantity + 1)}
                className={`${size==='large'?'w-14 border-l border-[#E5E0D8]':'w-9  bg-[#F5F3EE] border-none '}  h-9 flex items-center justify-center cursor-pointer `}>

                <Plus className='text-[#4A4A4A]' size={12}/>
            </button>
        </div>
    </>
}