import {useUserData} from "../../../../hooks/useUserData.ts";
import {useShoppingMethods} from "../../../../hooks/useCheckout.ts";
import ShoppingMethodItem from "./ShoppingMethodItem.tsx";
import type {ShoppingMethod} from "../../../../types/checkout.ts";
import {useState, type SubmitEvent, useEffect, useRef} from "react";
import ShoppingAddressItem from "./ShoppingAddressItem.tsx";
import type {Addresses} from "../../../../types/user.ts";
import AddressForm from "./AddressForm.tsx";
import {ArrowRight} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {checkoutAction} from "../../../../store/checkout-slice.tsx";
import type {RootState} from "../../../../store";

export default function ShippingStep({onStepCompleted}: { onStepCompleted: () => void }) {
    const {data: user} = useUserData();
    const {data: shoppingMethods = []} = useShoppingMethods();
    const dispatch = useDispatch();
    const shoppingStep = useSelector((state: RootState) => state.checkout.shoppingStep);
    const [selectedInfo, setSelectedInfo] = useState<{
        method: ShoppingMethod | null;
        address: Addresses | null;
        defaultEmail: string;
        defaultPhone: string;
        saveAddress: boolean;
        addressForm: Addresses | null;
        addressFormIsActive: boolean

    }>(() => {
        if (shoppingStep) {
            return {
                method: shoppingStep.shippingMethod,
                address: shoppingStep.address,
                defaultEmail: shoppingStep.email,
                defaultPhone: shoppingStep.phone,
                saveAddress: !!shoppingStep.saveAddress,
                addressForm: shoppingStep.addressForm,
                addressFormIsActive: shoppingStep.addressFormIsActive
            }
        }
        return {
            method: null,
            address: null,
            defaultEmail: '',
            defaultPhone: '',
            saveAddress: false,
            addressForm: null,
            addressFormIsActive: false
        }

    });

    const initializedRef = useRef(false);
    const methodSetRef = useRef(false);

    useEffect(() => {
        if (!initializedRef.current) {
            if (!shoppingStep && user?.addresses.length) {
                setUserForm( user.email, user.phoneNumber,user.addresses[0],);
                initializedRef.current = true;
            }
            if(!shoppingStep &&user&& !user?.addresses.length){
                setUserForm(user.email, user.phoneNumber);
                initializedRef.current = true;
            }
        }

        if (!shoppingStep && !methodSetRef.current && shoppingMethods.length > 0) {
            onMethodChange(shoppingMethods[0]);
            methodSetRef.current = true;
        }
    }, [user, shoppingStep, shoppingMethods]);

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const phone = formData.get('phone');
        const shippingMethod = selectedInfo.method;
        const saveAddress = formData.has('saveAddress');
        const address =selectedInfo.address
        let addressForm = null
        const getValue = (name: string) => {
            const value = formData.get(`${name}`) ?? "";
            return typeof value === "string"
                ? JSON.parse(value)
                : null;
        }
        if (selectedInfo.addressFormIsActive) {

            addressForm = {
                id: Date.now().toString(),
                isDefault: formData.has("defaultAddress"),
                name: String(formData.get("name") ?? ""),
                lastName: String(formData.get("lastName") ?? ""),
                city: getValue("city"),
                zipCode: String(formData.get("ZIP") ?? ""),
                country: getValue("country"),
                streetAddress: String(formData.get("streetAddress") ?? ""),
                state: getValue("state"),
            }
        }

        if (!addressForm && !address) return
        dispatch(checkoutAction.addFirstStep({
            email,
            phone,
            shippingMethod,
            address,
            saveAddress,
            addressForm,
            addressFormIsActive: selectedInfo.addressFormIsActive
        }))
        onStepCompleted()
    }

    function onMethodChange(method: ShoppingMethod) {
        setSelectedInfo((old) => {
            return {...old, method: method}
        })
    }

    function onAddressChange(address: Addresses | null) {
        setSelectedInfo((old) => {
            return {...old, address: address}
        })
    }

    function setUserForm(
        email: string,
        phone: string, address?: Addresses,

    ) {
        setSelectedInfo((old) => {
            return {
                ...old, ...(address&&address), defaultEmail: email,
                defaultPhone: phone,
            }
        })
    }


    function setStatus(value: boolean) {
        setSelectedInfo(old => {
            return {...old, addressFormIsActive: value}
        })
    }

    return <form onSubmit={handleSubmit}>
        <label className='text-[11px] font-semibold tracking-widest uppercase text-[#898781] '>Contact
            information</label>
        <div className='flex items-center gap-2.5 w-full pb-5 pt-3 mb-5 border-b border-b-[#0b0b0b]/10'>
            <div className='flex flex-col  w-full gep-1 '>
                <label htmlFor='email' className='text-[11px] font-medium tracking-wider'>Email</label>
                <input
                    defaultValue={selectedInfo.defaultEmail}
                    className='text-base   mt-1  border border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                    name='email' id='email' type='email' placeholder='email' required/>
            </div>
            <div className='flex flex-col  w-full gep-1 '>
                <label htmlFor='phone' className='text-[11px] font-medium tracking-wider'>Phone</label>
                <input
                    defaultValue={selectedInfo.defaultPhone}
                    className='text-base  mt-1  border border-[#0b0b0b]/10 rounded-md outline-none transition-all w-full h-9 px-3 py-2 bg-[#ffffff]'
                    name='phone' id='phone' type='text' placeholder='phone' required/>
            </div>
        </div>
        <label className='text-[11px] font-semibold tracking-widest uppercase text-[#898781] mb-3'>Shipping
            method</label>
        <ul className=' pb-5 pt-3 mb-5 border-b border-b-[#0b0b0b]/10 flex flex-col gap-2'>{shoppingMethods.map(method =>
            <ShoppingMethodItem onMethodChange={() => onMethodChange(method)} shoppingMethod={method}
                                isSelected={selectedInfo.method?.id === method.id}
                                key={method.id}/>)
        } </ul>
        <label className='text-[11px] font-semibold tracking-widest uppercase text-[#898781] mb-3'>Select delivery
            address
        </label>
        <ul className='mb-2.5 pt-3 flex items-center gap-2'>{user?.addresses?.map(address =>
            <ShoppingAddressItem address={address} onClick={() => onAddressChange(address)}
                                 isSelected={!selectedInfo.addressFormIsActive && selectedInfo.address?.id === address.id}
                                 key={address.id}/>)
        }
        </ul>
        <AddressForm onClick={setStatus} address={selectedInfo.addressForm}
                     saveAddressDefault={selectedInfo.saveAddress} showForm={selectedInfo.addressFormIsActive}/>
        <button

            className='w-full mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[14px] bg-transparent outline-none border border-[#0b0b0b]/20 cursor-pointer '
            type='submit'>
            <span> Continue to payment</span>
            <ArrowRight size={14}/>

        </button>
    </form>
}