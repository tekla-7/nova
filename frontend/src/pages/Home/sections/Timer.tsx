import {useEffect, useState} from "react";

export default function Timer() {
    const getDifference = () => {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        return Math.max(0, endOfDay.getTime() - now.getTime());
    };
    const [diff, setDiff] = useState(getDifference());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDiff(getDifference());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
        <div className="flex items-center gap-2">
            <TimeBlock value={hours} label="HRS"/>
            <span className="text-lg text-[#ffffff66]">:</span>

            <TimeBlock value={minutes} label="MIN"/>
            <span className="text-lg text-[#ffffff66]">:</span>

            <TimeBlock value={seconds} label="SEC"/>
        </div>
    );
}

function TimeBlock({value, label,}: { value: number; label: string; }) {
    return (
        <div className="rounded-md bg-[#ffffff1f] px-[10px] py-1">
            <p className="font-mono text-lg text-white">
                {value.toString().padStart(2, "0")}
            </p>
            <p className="text-center text-[9px] tracking-wider text-[#ffffff66]">
                {label}
            </p>
        </div>
    );
}