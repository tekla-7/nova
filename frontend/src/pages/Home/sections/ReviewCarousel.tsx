import type {Review} from "../../../types/product.ts";
import {ChevronRight} from 'lucide-react';
import {ChevronLeft} from 'lucide-react';
import {useRef,} from "react";
import Rating from "../../../components/ui/Rating.tsx";

export default function ReviewCarousel({reviews}: { reviews: Review[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    function scrollNext() {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({
            left: 260,
            behavior: "smooth",
        });
    }

    function scrollPrev() {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({
            left: -260,
            behavior: "smooth",
        });
    }

    return <section className='w-full relative'>
        <button
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 cursor-pointer"
            onClick={scrollPrev}
        >
            <ChevronLeft/>
        </button>
        <div className='flex items-center gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar'
             ref={containerRef}>
            {reviews.map((review: Review, index: number) => (
                <div key={review.date + index}
                     className='min-w-[270px] bg-[#F5F3EE] shrink-0 rounded-xl p-4 border border-[#E5E0D8] w-max'>
                    <div className='flex items-center gap-2.5 mb-2.5'>
                        <div
                            className='w-11 h-11 rounded-full bg-[#C8A97E] flex items-center justify-center text-[#5a3d00] text-[13px] flex-shrink-0 font-mono uppercase'>
                            {review.reviewerName.split(' ').map(e => e.slice(0, 1)).join('')}
                        </div>
                        <div>
                            <p className='text-[13px]'>{review.reviewerName}</p>
                            <p className='text-[#9A9A9A] text-[11px] pb-0.5'>
                                {new Date(review.date).toLocaleString()}
                            </p>
                            <Rating
                                rating={review.rating}/>
                        </div>
                    </div>
                    <p className='text-xs text-[#4A4A4A] '>{review.comment}</p>
                </div>
            ))}
        </div>
        <button
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 cursor-pointer"
            onClick={scrollNext}
        >
            <ChevronRight/>
        </button>
    </section>
}