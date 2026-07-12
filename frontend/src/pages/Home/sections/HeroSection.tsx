import BaseButton from "../../../components/ui/BaseButton.tsx";
import {useNavigate} from "react-router-dom";

export default function HeroSection() {
    const navigate = useNavigate();

    return <div className='grid grid-cols-[1fr_1.5fr] '>
        <div className='bg-[#F5F3EE]  pt-12 pb-10 px-7'>
            <p className='text-xs text-[#9A9A9A] mb-3 uppercase'>Spring / Summer 2026</p>
            <h1 className='text-3xl tracking-tight text-[#0D0D0D] pt-6 pb-4'>Dress for<br/>the moment.</h1>
            <p className="pt-3.5 pb-6 text-[14px] text-[#4A4A4A]">New arrivals, curated daily.<br/>Premium pieces,
                honest prices.</p>
            <div className='flex items-center gap-2.5'>
                <BaseButton onClick={() => navigate("/women")}>Show Now</BaseButton>
                <BaseButton variant='transparent' onClick={() => navigate('/sale')}>View Lookbook</BaseButton>

            </div>
        </div>
        <div className='bg-beige-gradient'>
            <img src='/cover' alt='cover img' className='h-full w-full object-cover' />
        </div>
    </div>
}