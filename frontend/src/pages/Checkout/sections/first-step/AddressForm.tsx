import {Plus, X} from "lucide-react";
import clsx from "clsx";
import Checkbox from "../../../../components/ui/Checkbox.tsx";
import type {Addresses} from "../../../../types/user.ts";
import CountryCitySelect from "./CountryCitySelect.tsx";

type Props = {
    onClick: (value: boolean) => void;
    address: Addresses | null;
    saveAddressDefault: boolean;
    showForm: boolean;
    showAddAddress?: boolean;
    showAddButton?: boolean;
}
export default function AddressForm({
                                        onClick,
                                        address,
                                        saveAddressDefault,
                                        showForm,
                                        showAddAddress = true,
                                        showAddButton,

                                    }: Props) {
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
                <h1 className='text-xs font-medium mb-3'>New address</h1>
                <div className='grid grid-cols-2 gap-2 w-full'>
                    <div className='flex flex-col  mb-2 '>
                        <label htmlFor='name' className='text-[11px] font-medium'>First name</label>
                        <input
                            defaultValue={address?.name}
                            className='text-base border mt-1 border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                            name='name' id='name' type='text' placeholder='name' required={showForm}/>
                    </div>
                    <div className='flex flex-col gap-1 mb-2'>
                        <label htmlFor='lastName' className='text-[11px] font-medium'>Last name</label>
                        <input
                            defaultValue={address?.lastName}
                            className='text-base border border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                            name='lastName' id='lastName' type='text' placeholder='last name' required={showForm}/>
                    </div>
                    <div className='flex flex-col gap-1  mb-2 col-span-2'>
                        <label htmlFor='streetAddress' className='text-[11px] font-medium'>Street address
                        </label>
                        <input
                            defaultValue={address?.streetAddress}
                            className='text-base border   border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                            name='streetAddress' id='streetAddress' type='text' placeholder='street'
                            required={showForm}/>
                    </div>

                    {showForm && <CountryCitySelect address={address}/>}
                    <div className='flex flex-col gap-1 mb-2 '>
                        <label htmlFor='ZIP' className='text-[11px] font-medium'>ZIP code
                        </label>
                        <input defaultValue={address?.zipCode}
                               className='text-base border    border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                               name='ZIP' id='ZIP' type='number' placeholder='ZIP' required={showForm} min={5}/>
                    </div>


                </div>
                {showAddAddress && <div className='flex items-center gap-2.5 mt-1 '>
                    <Checkbox name='saveAddress' id='saveAddress' key={address?.id}
                              defaultChecked={saveAddressDefault ?? false}
                    />
                    <label className='cursor-pointer text-[#52514e] text-xs' htmlFor='saveAddress'>Save this address to
                        my account</label>
                </div>}
                <div className='flex items-center gap-2.5 mt-1 '>
                    <Checkbox name='defaultAddress' id='defaultAddress' key={address?.id}
                              defaultChecked={address?.isDefault ?? false}

                    />
                    <label className='cursor-pointer text-[#52514e] text-xs' htmlFor='defaultAddress'>Set as default
                        address</label>
                </div>
                {showAddButton &&<div className=' flex justify-end w-full mt-2'> <button
                    className='px-4 py-1.5 w-max  bg-white text-sm bg-transparent border border-[#0b0b0b]/20 cursor-pointer rounded-lg'
                   type='submit'>Save</button></div>}
            </div>

        </div>

    </>
}