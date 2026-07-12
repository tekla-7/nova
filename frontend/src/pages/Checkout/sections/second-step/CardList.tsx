import type {Card} from "../../../../types/user.ts";
import clsx from "clsx";
import {CreditCard} from "lucide-react";

export default function CardList({cards, onCardSelect, activeCard}: {
    cards: Card[],
    onCardSelect: (card: Card) => void,
    activeCard: Card | null
}) {
    return <ul className='flex flex-col gap-1.5'>{cards.map((card) =>
        <li
            onClick={() => onCardSelect(card)}
            className={
                clsx('flex items-center gap-2.5 transition-all duration-75 rounded-lg cursor-pointer border px-[13px] py-[11px]',
                    {
                        "border-[#0b0b0b]/40": activeCard?.id === card.id,
                        "border-[#0b0b0b]/10": activeCard?.id !== card.id,
                    })
            } key={card.id}>
            <input type='radio' checked={activeCard?.id === card.id} readOnly={true}
                   className={clsx(
                       "w-4 h-4 accent-[#0b0b0b]",
                       {
                           "border-[#0b0b0b]/40": activeCard?.id === card.id,
                           "border-[#0b0b0b]/10": activeCard?.id !== card.id,
                       }
                   )}/>
            <CreditCard size={22} className='text-blue-900'/>

            <div>
                <h1 className='text-[12px] font-medium font-mono'>{card.number.split('').map((el, index) => {
                    const char = index > 11 ? el : '·';
                    if ((index + 1) % 4 === 0 && index !== 15) {
                        return char + ' ';
                    }
                    return char;
                }).join('')}</h1>
                <div className='flex items-center justify-between'>
                    <p className='text-[11px] text-[#898781] pt-0.5'>Expires {card.expiryData}</p>
                    {card.isDefault && <div className='uppercase w-fit text-[10px] py-0.5 px-2 rounded-[10px] font-medium bg-[#caeac7] text-[#006300]'>default</div>}

                </div>

            </div>


        </li>
    )}</ul>
}