import {type SubmitEvent, useEffect, useRef, useState} from "react";
import PaymentMethods from "./PaymentMethods.tsx";
import type {Card} from "../../../../types/user.ts";
import {useUserData} from "../../../../hooks/useUserData.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../../store";
import CardList from "./CardList.tsx";
import CardForm from "./CardForm.tsx";
import PayPal from "./PayPal.tsx";
import ApplePay from "./ApplePay.tsx";
import {ArrowRight} from "lucide-react";
import {checkoutAction} from "../../../../store/checkout-slice.tsx";

export default function PaymentStep({onStepCompleted}: { onStepCompleted: () => void }) {
    const {data: user} = useUserData();
    const dispatch = useDispatch();
    const paymentStep = useSelector((state: RootState) => state.checkout.paymentStep);
    const [selectedInfo, setSelectedInfo] = useState<{
        card: Card | null;
        saveCard: boolean;
        paymentMethodId: number;
        cardForm: Card | null;
        cardFormIsActive: boolean;
    }>(() => {
        if (paymentStep) {
            return {
                paymentMethodId: paymentStep.paymentMethodId,
                card: paymentStep.card,
                saveCard: !!paymentStep.saveCard,
                cardForm: paymentStep.cardForm,
                cardFormIsActive: paymentStep.cardFormIsActive

            };
        }
        return {
            paymentMethodId: 1,
            card: null,
            saveCard: false,
            cardForm: null,
            cardFormIsActive: false
        };
    });

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedInfo.paymentMethodId!==1) return;
        if (!selectedInfo.card && !selectedInfo.saveCard) return

        dispatch(checkoutAction.addLastStep({
            paymentMethodId: selectedInfo.paymentMethodId,
            card:selectedInfo.card,
            saveCard:selectedInfo.saveCard,
            cardForm:selectedInfo.cardForm,
            cardFormIsActive:selectedInfo.cardFormIsActive,

        }))
        onStepCompleted()    }
    const initializedRef = useRef(!!paymentStep);

    function setCard(card: Card) {
        setSelectedInfo(old => ({...old, card: card}));
    }

    useEffect(() => {
        if (initializedRef.current) return;
        if (user?.card.length && !paymentStep) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCard(user.card[0]);
            initializedRef.current = true;
        }
    }, [user, paymentStep]);

    function onPaymentMethodSelect(id: number) {
        setSelectedInfo(old => {
            return {...old, paymentMethodId: id}
        })

    }

    function onCardSelected(card: Card) {
        setSelectedInfo(old => {
            return {...old, card: card}
        })
    }

    function setStatus(value: boolean) {
        setSelectedInfo(old => {
            return {...old, cardFormIsActive: value}
        })
    }


    return <form onSubmit={handleSubmit}>
        <label className='text-[11px] font-semibold tracking-widest uppercase text-[#898781] '>Select payment
            method</label>
        <div className='w-full pt-3 mb-5'>
            <PaymentMethods onPaymentMethodSelect={onPaymentMethodSelect}
                            activeMethodId={selectedInfo.paymentMethodId}/>
        </div>
        {selectedInfo.paymentMethodId === 1 && <> <label
            className='text-[11px] font-semibold tracking-widest uppercase text-[#898781] '>Your saved
            cards</label>
            {user?.card.length && <>
                <div className='w-full pt-3'>
                    <CardList cards={user?.card ?? []}
                              activeCard={!selectedInfo.cardFormIsActive ? selectedInfo.card : null}
                              onCardSelect={onCardSelected}/>
                </div>
                <div className='flex items-center gap-2.5 my-3'>
                    <div className='h-[1px] flex-1 bg-[#E5E0D8]'></div>
                    <span
                        className='text-[11px] text-[#9A9A9A] pb-1'>or add new card</span>
                    <div className='h-[1px] flex-1 bg-[#E5E0D8]'></div>
                </div>
            </>}
            <CardForm onClick={setStatus} showForm={selectedInfo.cardFormIsActive} saveCard={selectedInfo.saveCard}
                      card={selectedInfo.cardForm}/></>
        }
        {selectedInfo.paymentMethodId === 2 && <PayPal/>}
        {selectedInfo.paymentMethodId === 3 && <ApplePay/>}
        <button
            className='w-full mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-[14px] bg-transparent outline-none border border-[#0b0b0b]/20 cursor-pointer '
            type='submit'>
            <span> Continue to payment</span>
            <ArrowRight size={14}/>

        </button>
    </form>
}