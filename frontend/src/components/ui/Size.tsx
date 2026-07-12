import {PRODUCT_SIZE} from "../../constants/colors.ts";

export default function Size({selectedSize, onSelectedSizeChange}: {
    selectedSize: string,
    onSelectedSizeChange: (color: string) => void
}) {

    return <>
        <div className="font-medium uppercase text-[11px] text-[#0D0D0D] mb-2 ">
            size
        </div>
        <div className='flex  gap-2 mb-1.5 flex-wrap '>
            {PRODUCT_SIZE.map((item) => (
                <button key={item}
                        onClick={() => onSelectedSizeChange(item)}

                        className={`
                        flex items-center justify-center uppercase  min-w-12
                       px-3.5 py-2 transition-all duration-300 ease-in-out
                        border rounded-[4px] tr  cursor-pointer ${selectedSize === item ? `bg-[#0D0D0D] text-white border-[#0D0D0D]` : 'bg-white text-[#0D0D0D]  border-[#E5E0D8] '}`}>
                    {item}
                </button>
            ))}
        </div>
    </>
}