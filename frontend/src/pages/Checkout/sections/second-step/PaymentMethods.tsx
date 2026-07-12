import clsx from "clsx";

export default function PaymentMethods({onPaymentMethodSelect, activeMethodId}: {
    onPaymentMethodSelect: (id: number) => void,
    activeMethodId: number
}) {
    const paymentMethods = [
        {id: 1, title: 'Credit / Debit card', description: 'Visa , Mastercard , Amex', cards: ['visa', 'mc', 'amex']},
        {id: 2, title: 'PayPal'},
        {id: 3, title: 'Apple Pay'},
    ];
    return <ul className='flex flex-col gap-2'>
        {paymentMethods.map(paymentMethod =>
            <li
                onClick={() => onPaymentMethodSelect(paymentMethod.id)}
                className={
                    clsx('flex items-center gap-2.5 transition-all duration-75 rounded-lg cursor-pointer border px-[13px] py-[11px]',
                        {
                            "border-[#0b0b0b]/40": activeMethodId === paymentMethod.id,
                            "border-[#0b0b0b]/10": activeMethodId !== paymentMethod.id,
                        })
                } key={paymentMethod.id}>
                <input type='radio' checked={activeMethodId === paymentMethod.id} readOnly={true}
                       className={clsx(
                           "w-4 h-4 accent-[#0b0b0b]",
                           {
                               "border-[#0b0b0b]/40": activeMethodId === paymentMethod.id,
                               "border-[#0b0b0b]/10": activeMethodId !== paymentMethod.id,
                           }
                       )}/>
                <div>
                    <h1 className='text-[13px] font-medium'>{paymentMethod.title}</h1>
                    {paymentMethod.description &&
                        <p className='text-[11px] text-[#898781] pt-0.5'>{paymentMethod.description}</p>}
                </div>

                {paymentMethod.cards && <div className='flex gap-1  ml-auto items-center'>
                    {paymentMethod.cards.map(card =>
                        <div className='uppercase border border-[#0b0b0b]/10 rounded px-1.5 py-1 text-[9px] text-[#898781
]' key={card}>{card}</div>
                    )}
                </div>}


            </li>
        )}
    </ul>

}