import {useRevalidator, useRouteLoaderData} from "react-router-dom";
import type {Addresses, User} from "../../../types/user.ts";
import {type SubmitEvent, useRef, useState} from "react";
import AddressForm from "../../Checkout/sections/first-step/AddressForm.tsx";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {addAddresses, deleteAddress, editAddresses} from "../../../utils/http.ts";
import {uiAction as notificationAction } from "../../../store/ui-slice.tsx";

type State = {
    address: Addresses | null,
    showForm: boolean
}
export default function Addresses() {
    const user = useRouteLoaderData("profile") as User;
    const [selectedAddress, setSelectedAddress] = useState<State>({address: null, showForm: false});
    const dispatch = useDispatch();
    const {revalidate} = useRevalidator();
    const formRef = useRef<HTMLFormElement>(null);

    function toggle() {
        formRef.current?.reset();

        setSelectedAddress((old: State) => ({
            address: null,
            showForm: !old.showForm,
        }));
    }

    function select(address: Addresses) {
        setSelectedAddress(() => ({
            showForm: true,
            address: address
        }));
    }

    function onSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const formData = new FormData(event.target);
        const getValue = (name: string) => {
            const value = formData.get(`${name}`) ?? "";
            return typeof value === "string"
                ? JSON.parse(value)
                : null;
        }
        const addressForm: Addresses = {
            isDefault: formData.has("defaultAddress"),
            name: String(formData.get("name") ?? ""),
            lastName: String(formData.get("lastName") ?? ""),
            city: getValue("city"),
            zipCode: Number(formData.get("ZIP")),
            country: getValue("country"),
            streetAddress: String(formData.get("streetAddress") ?? ""),
            state: getValue("state"),
        }

        if(selectedAddress.address&&selectedAddress.address.id){
            edit.mutate({id:selectedAddress.address.id,addresses: addressForm})
            return
        }
        addNewAddresses.mutate(addressForm)
    }

    function onDelete(id: string | undefined) {
        if (!id) return
        deleteNewAddresses.mutate(id)
    }

    const addNewAddresses = useMutation({
        mutationFn: addAddresses,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully updated'));
            toggle()
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Address was add successfully',
            }))
        },
        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message,
            }))
        }
    });
    const deleteNewAddresses = useMutation({
        mutationFn: deleteAddress,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully deleted'));
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Address was deleted successfully',
            }))
        },
        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message,
            }))
        }
    });
    const edit=useMutation({
        mutationFn:editAddresses,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully updated'));
            toggle()
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Address was updated successfully',
            }))
        },
        onError: (error) => {
            dispatch(notificationAction.showNotification({
                status: 'error',
                title: 'Error',
                message: error.message,
            }))
        }
    })
    return <>
        <h1 className='text-base font-medium mb-4'>Saved addresses</h1>
        <ul className='flex items-center gap-2.5 mb-3 flex-wrap'> {user.addresses?.map((address) =>
            <li key={address.id}
                className="border-[#0b0b0b]/10 flex-shrink-0 flex flex-col h-[-webkit-fill-available] justify-between
                rounded-[8px] p-3 border cursor-pointer transition-all duration-200 ease-in-out">
                <div className='flex items-start justify-between gap-1'>
                    <p className='text-[13px] text-left font-medium pb-0.5'>{address.name} {address.lastName}</p>
                    {
                        address.isDefault && <div className='w-fit text-[9px] font-semibold inline-block uppercase bg-[#fcfcfb] border border-[#0b0b0b]/10 text-[#898781
] py-[1px] px-1.5 rounded-[20px] tracking-wider mb-1.5'>default</div>
                    }
                </div>

                <p className='text-[11px] text-left text-[#52514e] leading-normal'>{address.streetAddress}
                    <br/> {address.city.name} {address.zipCode} <br/>{address.country.name}</p>
                <div className='flex items-center gap-2 mt-2'>
                    <button
                        onClick={() => select(address)}
                        className='px-4 py-1 text-sm bg-transparent border border-[#0b0b0b]/20 cursor-pointer rounded-lg'>Edit
                    </button>
                    <button
                        onClick={() => onDelete(address?.id)}
                        className='px-4 py-1 text-sm bg-transparent border border-[#0b0b0b]/20 cursor-pointer rounded-lg'>Delete
                    </button>
                </div>
            </li>
        )}</ul>
        <form onSubmit={onSubmit} ref={formRef}>
            <AddressForm
                         showAddButton={true} showAddAddress={false} address={selectedAddress.address}
                         showForm={selectedAddress.showForm}
                         saveAddressDefault={selectedAddress.address?.isDefault || false} onClick={toggle}/></form>
    </>

}