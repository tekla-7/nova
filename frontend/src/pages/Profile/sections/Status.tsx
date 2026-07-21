import type {Tracking} from "../../../types/Order.ts";
import clsx from "clsx";
import {Check, Clock, Van} from "lucide-react";

export default function Status({tracking}: {tracking: Tracking }) {
    return <span className={clsx(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-[20px] text-[10px] font-medium",
        {
            "bg-[#caeac7] text-[#006300]": tracking.delivered.isConfirmed,

            "bg-[#cde2fb] text-[#184f95]":
                tracking.dispatched.isConfirmed &&
                !tracking.delivered.isConfirmed,

            "bg-[#f9dca4] text-[#734500]":
                !tracking.dispatched.isConfirmed &&
                !tracking.delivered.isConfirmed,
        }
    )}>
        {tracking.delivered.isConfirmed && <><Check size={12}/> <p>Delivered</p></>}
        {tracking.dispatched.isConfirmed && !tracking.delivered.isConfirmed && <><Van size={12}/> <p>Shipped</p></>}
        {!tracking.dispatched.isConfirmed && !tracking.delivered.isConfirmed && <><Clock size={12}/>
            <p>Processing</p></>}

    </span>
}