import {useState} from "react";
import type {Step} from "../../types/checkout.ts";
import Steps from "./sections/Steps.tsx";
import ShippingStep from "./sections/first-step/ShippingStep.tsx";
import PaymentStep from "./sections/second-step/PaymentStep.tsx";
import ConfirmStep from "./sections/third-step/ConfirmStep.tsx";
import SideInfo from "./sections/SideInfo.tsx";

export default function Checkout() {
    const [steps, setSteps] = useState<Step[]>([
        {id: 1, title: 'Shopping', isActive: true, isComplete: false ,isBlocked:true},
        {id: 2, title: 'Payment', isActive: false, isComplete: false,isBlocked:true},
        {id: 3, title: 'Confirm', isActive: false, isComplete: false,isBlocked:true},
    ]);
    const onStepChange = (id: number) => {
        setSteps(steps => {
            return steps.map(step => {
                if (step.id === id) {
                    return {...step, isActive: true,};
                }
                return {...step, isActive: false};
            })
        })
    }
    const onStepCompleted = (id: number) => {
        setSteps(steps => {
            return steps.map(step => {
                if (step.id === id) {
                    return {...step,isActive:false, isComplete: true ,isBlocked:false};
                }
                if (step.id === id+1) {
                    return {...step, isActive: true,isBlocked:false};
                }
                return {...step, isActive: false};
            })
        })
    }
    const activeStep: Step = steps.find(step => step.isActive)!
    return <>

        <Steps steps={steps} onStepChange={(id: number) => onStepChange(id)}/>
        <div className='grid grid-cols-[1fr_0.7fr] min-h-[70vh]'>
            <div className='p-5 border-r border-r-[#E5E0D8]'>
                {activeStep.id === 1 && <ShippingStep onStepCompleted={()=>onStepCompleted(1)}/>}
                {activeStep.id === 2 && <PaymentStep onStepCompleted={()=>onStepCompleted(2)}/>}
                {activeStep.id === 3 && <ConfirmStep onStepCompleted={(id:number)=>onStepChange(id)}/>}
            </div>
            <SideInfo activeStep={steps.find(el=>el.isActive)!.id}/>
        </div>
    </>
}