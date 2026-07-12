import BaseButton from "../../../components/ui/BaseButton.tsx";
import {useNavigate} from "react-router-dom";

export default function PromoBanner() {
    const navigate = useNavigate();
    return <div className="mx-6 bg-primary mb-5 px-6 py-5 flex justify-between items-center text-white rounded-xl">
        <div>
            <div className="bg-[#C8A97E] text-[#5a3d00] text-[10px]  px-3 py-1 rounded-[20px] mb-2 inline-block tracking-widest">LIMITED OFFER</div>
            <div className="text-white text-lg mb-1.5">Up to 40% off<br/>Selected styles</div>
            <div className="text-xs text-[#FFFFFF99]">Ends Sunday midnight · Free express shipping</div>
        </div>
        <BaseButton variant='light' onClick={() => navigate('/sale')}>Explore Sale</BaseButton>
    </div>
}