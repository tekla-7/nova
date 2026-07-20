import {createPortal} from "react-dom";
import {type RefObject, useEffect, useState} from "react";
import type {CreateOrder} from "../../../../types/Order.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../store";
import {useOrderMutation} from "../../../../hooks/useOrderMutation.ts";
import {useUserCartData} from "../../../../hooks/useUserData.ts";

type Props = {
    ref: RefObject<HTMLDialogElement | null>;
    onClose: () => void;
    isOpen: boolean;
};

export default function ApplePayModal({ref, onClose, isOpen}: Props) {
    const [paymentState, setPaymentState] = useState('start')
    const checkout = useSelector((state: RootState) => state.checkout);
    const {createOrderHandler} = useOrderMutation()
    const {data: shoppingBag = []} = useUserCartData();

    function createOrder() {
        if (!checkout.shoppingStep || !shoppingBag.length) return null;
        const shoppingStep = checkout.shoppingStep
        const address = shoppingStep.addressFormIsActive ? shoppingStep.addressForm : shoppingStep.address
        if (!address) return null;
        const shipping = checkout.shoppingStep.shippingMethod.price;
        const subtotal = shoppingBag.reduce((prev, cur) => prev + cur.quantity * cur.product.price, 0)
        const total = (shipping + subtotal) * 108 / 100;
        const order: CreateOrder = {
            paid: total,
            email: shoppingStep.email,
            phone: shoppingStep.phone,
            payment: null,
            paymentMethod: 'Apple Pay',
            deliveryMethod: shoppingStep.shippingMethod,
            items: shoppingBag,
            address: address,

        }
        createOrderHandler(order)

    }

    useEffect(() => {
        if (!isOpen) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (paymentState !== 'start') setPaymentState("start");
        let successTimeout: number;
        const processingTimeout = setTimeout(() => {
            setPaymentState("processing");

            successTimeout = setTimeout(() => {
                setPaymentState("success");
                createOrder();
            }, 2000);

        }, 1000);
        return () => {
            clearTimeout(processingTimeout);
            clearTimeout(successTimeout);
        };
    }, [isOpen]);
    return createPortal(
        <dialog
            ref={ref}
            className="
    fixed
    open:flex flex-col items-center
    top-1/2
    left-1/2
    -translate-x-1/2
    -translate-y-1/2
    w-3/5
    max-w-xl
    p-6
    rounded-lg
    border-0
    shadow-2xl
    z-50
    backdrop:bg-gray-400/50
    backdrop:backdrop-blur-sm
  ">
            <div

                className="flex flex-col items-center animate-fadeIn"
            >
                {paymentState === "start" && (
                    <>
                        <div
                            className="w-[72px] h-[72px] rounded-full border-2 flex items-center justify-center border-[#0b0b0b]/10 mt-3 mb-5">
                            <p className="text-3xl">🔐</p>
                        </div>

                        <h1 className="text-center text-sm font-medium mb-1">
                            Confirm with Face ID
                        </h1>

                        <h2 className="text-center text-xs text-[#898781] mb-3.5">
                            Look at your iPhone to authorise<br/>
                            the payment to NOVA
                        </h2>
                    </>
                )}

                {paymentState === "processing" && (
                    <>
                        <div
                            className="w-[72px] h-[72px] animate-pulseShadow rounded-full border-2 flex items-center justify-center border-[#0b0b0b] mt-3 mb-5">
                            <p className="text-3xl">👁️</p>
                        </div>

                        <h1 className="text-center text-sm font-medium mb-1">
                            Scanning face...
                        </h1>

                        <h2 className="text-center text-xs text-[#898781] mb-3.5">
                            Hold still
                        </h2>
                    </>
                )}
            </div>
            <button className='px-4 py-2 border text-[14px] border-[#0b0b0b]/20 rounded-lg cursor-pointer' type='button'
                    onClick={onClose}>Cancel
            </button>
        </dialog>

        , document.getElementById("modal")!
    )
}