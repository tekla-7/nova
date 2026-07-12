import {Star} from 'lucide-react';

interface Props {
    rating: number,
    reviewCount?: number,
    showFullRatingInfo?: boolean
}

export default function Rating({rating, reviewCount, showFullRatingInfo = false}: Props) {
    const roundedRating = Math.round(rating);
    return (<div className='flex items-center gap-0.5'>
        {[1, 2, 3, 4, 5].map(rate =>
            <Star key={rate} size='11px' className={
                rate <= roundedRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-yellow-400"
            }/>
        )}
        {showFullRatingInfo && <span className='text-[13px] ml-2 '>{rating}</span>}
        {reviewCount && <span
            className={`text-[#9A9A9A] text-[10px] ml-0.5 ${showFullRatingInfo ? 'underline-offset-1 underline' : 'mb-0.5 '}`}>({reviewCount} {showFullRatingInfo && 'reviews'})</span>}
        {showFullRatingInfo && rating > 4 && <div className='flex items-center text-xs text-[#4A4A4A] ml-1'>
            <Star size='12px' className=
                "fill-[#2B8A3E] text-[#2B8A3E] mr-0.5"
            />
            Top rated
        </div>}
    </div>)
}