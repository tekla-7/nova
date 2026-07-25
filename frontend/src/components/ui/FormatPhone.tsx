import {useEffect, useState} from "react";
type Props = {
    name: string;
    defaultValue?:string
};
export function FormatPhone({name ,defaultValue}: Props) {
    const [phone, setPhone] = useState('');

    const formatPhone = (value: string) => {
        const numbers = value
            .replace(/\D/g, "")
            .replace(/^995/, "")
            .slice(0, 9);

        if (numbers.length <= 3) return `+(995) ${numbers}`;
        if (numbers.length <= 5)
            return `+(995) ${numbers.slice(0, 3)} ${numbers.slice(3)}`;
        if (numbers.length <= 7)
            return `+(995) ${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`;

        return `+(995) ${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`;
    };
    useEffect(() => {
        if(defaultValue){
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPhone(formatPhone(defaultValue));
        }
    }, [defaultValue]);

    const isValid = /^\+\(995\)\s\d{3}\s\d{2}\s\d{2}\s\d{2}$/.test(phone);

    return (
        <div>
            <label
                className="text-[13px] font-medium mb-1"
                htmlFor="number"
            >
                Phone number
            </label>

            <input
                name={name}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className={`w-full border rounded px-3.5 py-2.5 text-[13px] bg-white text-[#0D0D0D]
                    ${!isValid && phone ? "border-red-500" : "border-[#E5E0D8]"}`}
                id="number"
                type="tel"
                placeholder=" + (995) 555 55 55 55"
                required
            />

            {!isValid && phone && (
                <p className="text-red-500 text-xs mt-1">
                    Invalid phone number format
                </p>
            )}
        </div>
    );
}
