import type {Product} from "../../../types/product.ts";
import Rating from "../../../components/ui/Rating.tsx";
import Price from "../../../components/ui/Price.tsx";
import {useNavigate} from "react-router-dom";

export default function FeaturedProductItem({event}: { event: Product }) {
    const navigate=useNavigate()
    return <div className=" rounded-xl overflow-hidden">

            <div
                className='aspect-[3/4] bg-[#F5F3EE] max-h-[270px] mb-2.5 rounded-lg w-full p-3 border-[#E5E0D8] border '>

                <img
                    src={event.images[0]}
                    alt={event.title}
                    className="h-full rounded-lg w-full object-cover"
                />
            </div>


            <div className="">
                <p className='text-[10px] pb-0.5 text-[#9A9A9A] tracking-widest'>NOVA</p>
                <h3 className="text-sm cursor-pointer pb-1 font-medium" onClick={() => navigate(`${event.id}`)}>{event.title}</h3>
                <Price price={event.price} discountPercentage={event.discountPercentage} type='dark'/>
                <Rating rating={event.rating} reviewCount={event.reviews.length}/>
            </div>



    </div>
}