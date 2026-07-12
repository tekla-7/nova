import Prices from "../../models/price.ts";

type Props = {
    price: number;
    discountPercentage?: number;
    type: 'light' | 'dark';
    size?: 'medium' | 'large';
    showDiscountBadge?: boolean
};

export default function Price({price, discountPercentage, type, size = 'medium', showDiscountBadge = false}: Props) {
    const {originalPrice} = new Prices(price, discountPercentage);

    return <div className={`flex gap-1.5 ${size === 'medium' ? ' gap-1.5 items-center' : 'gap-2.5 items-end '}`}>
        <span
            className={`${type === "light" ? "text-white" : ""} ${size === 'medium' ? 'text-sm ' : 'text-[26px]'}`}>${Number(price).toFixed(2)}</span>
        {originalPrice !== price && (
            <span
                className={` text-[#9A9A9A] line-through ${size === 'medium' ? 'text-xs' : 'text-base mb-1'}`}>${Number(originalPrice).toFixed(2)}</span>
        )}
        {showDiscountBadge &&
            <div className='bg-[#D63B3B] text-white text-[11px] px-2 py-0.5 rounded-[3px] mb-1 font-mono'>{discountPercentage}%</div>}
    </div>
}