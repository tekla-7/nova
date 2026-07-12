import {Plus, X} from "lucide-react";
import clsx from "clsx";
import Checkbox from "../../../../components/ui/Checkbox.tsx";
import type {Card} from "../../../../types/user.ts";

type Props = {
    onClick: (value: boolean) => void;
    showForm: boolean;
    card: Card | null;
    saveCard: boolean;
}
export default function CardForm({onClick, showForm, card, saveCard}: Props) {


    function onChange() {
        onClick(!showForm)
    }


    return <>
        <button
            onClick={onChange}
            type='button'
            className='w-full cursor-pointer font-medium rounded-lg px-3 py-[11px] flex items-center justify-center gap-1.5 text-xs text-[#898781] border border-dashed border-[#0b0b0b]/10 hover:bg-[#fcfcfb]'>
            {!showForm && <><Plus size={18}/>
                Use a different address</>}
            {showForm && <><X size={18}/>
                Cancel</>}
        </button>
        <div
            className={clsx(
                "overflow-hidden transition-all duration-300 ease-in-out",
                showForm
                    ? "max-h-[500px] opacity-100 mt-2 "
                    : "max-h-0 opacity-0 mt-0"
            )}
        >
            <div className="bg-[#fcfcfb] border border-[#0b0b0b]/10 rounded-lg p-3.5">
                <div className='grid grid-cols-2 gap-2 w-full'>

                    <div className='flex flex-col gep-1  mb-2 col-span-2'>
                        <label htmlFor='number' className='text-[11px] font-medium'>Card number
                        </label>
                        <input
                            defaultValue={card?.number}
                            className='text-base border  mt-1  border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                            name='number' id='number' type='number' placeholder='number'
                            required={showForm} min={16} max={16}/>
                    </div>
                    <div className='flex flex-col gep-1 mb-2 '>
                        <label htmlFor='expiryData' className='text-[11px] font-medium'>Expiry
                        </label>
                        <input defaultValue={card?.expiryData}
                               className='text-base border  mt-1  border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                               name='expiryData' id='expiryData' type='text' placeholder='MM/YY' required={showForm}
                               min={5}/>
                    </div>
                    <div className='flex flex-col gep-1 mb-2'>
                        <label htmlFor='cvv' className='text-[11px] font-medium'>CVV
                        </label>
                        <input
                            defaultValue={card?.cvv}
                            className='text-base border  mt-1  border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                            name='cvv' id='cvv' type='number' placeholder='cvv' required={showForm} max={3} min={3}/>
                    </div>

                    <div className='flex flex-col gep-1 mb-2 col-span-2'>
                        <label htmlFor='name' className='text-[11px] font-medium'>Name on card
                        </label>
                        <input
                            defaultValue={card?.name}
                            className='text-base border  mt-1  border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                            name='name' id='name' type='text' placeholder='name' required={showForm}/>
                    </div>

                </div>
                <div className='flex items-center gep-2.5 mt-1 '>
                    <Checkbox name='save' id='save' key={card?.id}
                              defaultChecked={saveCard ?? false}
                    />
                    <label className='cursor-pointer text-[#52514e] text-xs' htmlFor='save'>Save card for future
                        purchases
                    </label>
                </div>
            </div>
        </div>

    </>
}