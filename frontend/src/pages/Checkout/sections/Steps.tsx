import type {Step} from "../../../types/checkout.ts";
import classes from "./step.module.scss";
import clsx from "clsx";
import {Check} from "lucide-react";

export default function Steps({steps, onStepChange}: { steps: Step[], onStepChange: (id: number) => void }) {

    return <ul className='flex items-center  px-4 py-5 border border-[#0b0b0b]/10 '>
        {steps.map((step) => (
            <li key={step.id} className={clsx(
                "flex items-center ",
                {
                    'flex-1': step.id !== 3,
                    [classes.active]: step.isActive,
                    [classes.completed]: step.isComplete && !step.isActive,
                    [classes.block]: !step.isActive && !step.isComplete,
                }
            )}>
                <button className='border-none cursor-pointer flex items-center gap-[7px]' disabled={step.isBlocked}
                        onClick={() => onStepChange(step.id)}>
                    <div
                        className='w-6 h-6 rounded-full flex items-center justify-center text-[11px]  shrink-0'>
                        {step.isComplete&&!step.isActive ? <Check size={12}/>:step.id}
                      </div>
                    <p className=''>{step.title}</p>
                </button>

                {step.id !== 3 && <div className='flex-1 h-0.5 mx-2.5'></div>}
            </li>
        ))}
    </ul>
}