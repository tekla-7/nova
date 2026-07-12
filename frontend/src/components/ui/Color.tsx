import {PRODUCT_COLORS} from "../../constants/colors";

export default function Color({selectedColor, onSelectedColorChange}: {
    selectedColor: string,
    onSelectedColorChange: (color: string) => void
}) {

    return <>
        <div className="flex items-center text-[11px] text-[#0D0D0D] mb-2 ">
            <span className='uppercase font-medium'>Color — </span>
            <span>Charcoal</span>
        </div>
        <div className='flex items-center gap-2 mb-4 transition-all duration-300 ease-in-out'>
            {PRODUCT_COLORS.map((item) => (
                <button key={item.value}
                        onClick={() => onSelectedColorChange(item.value)}
                        style={{
                            backgroundColor: item.value,
                            borderColor: item.value === '#fff' ? '#E5E0D8' : item.value,
                            outlineColor: selectedColor === item.value ? (item.value === '#fff' ? '#E5E0D8' : item.value) : undefined,
                        }}
                        className={`w-7 h-7 border rounded-full cursor-pointer ${selectedColor === item.value ? `outline outline-2 outline-offset-2 ` : undefined}`}>

                </button>
            ))}
        </div>
    </>
}