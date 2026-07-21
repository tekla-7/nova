import {CreditCard} from "lucide-react";
import {useRevalidator, useRouteLoaderData} from "react-router-dom";
import type {Card, User} from "../../../types/user.ts";
import CardForm from "../../Checkout/sections/second-step/CardForm.tsx";
import {type SubmitEvent, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import {addCard, deleteCard} from "../../../utils/http.ts";
import {notificationAction} from "../../../store/ui-slice.tsx";

export default function Cards() {
    const user = useRouteLoaderData("profile") as User;
    const [showForm, setShowForm] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {revalidate} = useRevalidator();
    const formRef = useRef<HTMLFormElement>(null);

    function toggle() {
        formRef.current?.reset();
        setShowForm((old: boolean) => !old);
    }

    function onSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.stopPropagation();
        event.preventDefault();
        const formData = new FormData(event.target);

        const cardForm: Card = {
            isDefault: formData.has("default"),
            name: String(formData.get("name") ?? ""),
            number: String(formData.get("number") ?? ''),
            expiryData: String(formData.get("expiryData")),
            cvv: Number(formData.get("cvv")),
        }

        add.mutate(cardForm)
    }

    function onDelete(id: string) {
        deleteMt.mutate(id)
    }

    const add = useMutation({
        mutationFn: addCard,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully updated'));
            toggle()
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Card was add successfully',
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
    const deleteMt = useMutation({
        mutationFn: deleteCard,
        onSuccess: () => {
            revalidate().then(() => console.log('Successfully deleted'));
            dispatch(notificationAction.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Card was deleted successfully',
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

    return <>
        <h1 className='text-base font-medium mb-4'>Saved cards</h1>

        <ul className='flex items-center flex-wrap gap-3 mb-3'>{user.card.map((card) =>
            <li
                className='w-max border-[#0b0b0b]/10 flex items-center gap-2.5 transition-all duration-75 rounded-lg cursor-pointer border px-5 py-[11px]'
                key={card.id}>
                <CreditCard size={22} className='text-blue-900'/>
                <div>
                    <div className='pr-5'>


                    <div className='flex items-center gap-1 mb-1 justify-between'>
                        <h1 className='text-sm font-semibold '>{card.name} </h1>
                        {card.isDefault && <div
                            className='uppercase w-fit text-[10px] py-0.5 px-2 rounded-[10px] font-medium bg-[#caeac7] text-[#006300]'>default</div>}
                    </div>
                    <h1 className='text-sx font-medium font-mono'>{card.number.split('').map((el, index) => {
                        const char = index > 11 ? el : '·';
                        if ((index + 1) % 4 === 0 && index !== 15) {
                            return char + ' ';
                        }
                        return char;
                    }).join('')}</h1>
                    <p className='text-[11px] text-[#898781]'>Expires {card.expiryData}</p>
                    </div>
                    <div className='flex items-center justify-end'>


                        <button
                            onClick={() => onDelete(card?.id ?? '')}
                            className='px-4 py-0.5 text-sm bg-transparent border border-[#0b0b0b]/20 cursor-pointer rounded-lg'>Delete
                        </button>
                    </div>
                </div>


            </li>
        )}</ul>
        <form ref={formRef} onSubmit={onSubmit}>
            <CardForm showAddButton={true} showAddCard={false} card={null}
                      showForm={showForm}
                      saveCard={false} onClick={toggle}/></form>
    </>
}