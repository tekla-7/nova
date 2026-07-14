import {useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {Van} from "lucide-react";

export default function DeliveryCard() {
    const shoppingStep = useSelector((state: RootState) => state.checkout.shoppingStep);
    if (!shoppingStep) return null;
    console.log(shoppingStep);
    const start = new Date();
    start.setDate(start.getDate() + 3);
    const end = new Date();
    end.setDate(end.getDate() + 5);
    let shippingDate: Date[] | null = [start, end];
    if (shoppingStep.shippingMethod.price === 12) {
        const start = new Date();
        start.setDate(start.getDate() + 1);

        const end = new Date();
        end.setDate(end.getDate() + 2);

        shippingDate = [start, end];
    }

    if (shoppingStep.shippingMethod.price === 23) {
        shippingDate = null;
    }
    const formatShippingDate = (dates: Date[] | null) => {
        if (!dates) return "Today";

        const [start, end] = dates;

        const sameMonth =
            start.getMonth() === end.getMonth() &&
            start.getFullYear() === end.getFullYear();

        if (sameMonth) {
            return `${start.toLocaleDateString("en-US", {
                month: "short", 
            })} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
        }

        return `${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })} – ${end.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}`;
    };
    return <div className='mt-3.5 p-2.5 text-[#006300]  bg-[#caeac7] rounded-lg border border-[#C0DD97]'>
        <div className='flex items-center gap-1'><Van size={14}/>
            <span className='font-medium text-[11px]'>{shoppingStep.shippingMethod.title}</span>
        </div>
        <p className='pt-1 text-[11px]'>Estimated arrival:{shippingDate?formatShippingDate(shippingDate):'Today ,before 2pm'} </p>
    </div>
}