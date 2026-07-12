import type {ReactNode} from "react";

type BaseButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "dark" | "light" | 'transparent';
    size?: "small" | "medium" | "large";
    disable?: boolean
};

export default function BaseButton({
                                       children,
                                       onClick,
                                       type = "button",
                                       variant = "dark",
                                       size = 'small',
                                       disable = false
                                   }: BaseButtonProps) {
    const classes = `font-medium  rounded ` +
        (variant === "dark"
            ? "bg-[#0D0D0D] text-white "
            : variant === "light"
                ? "bg-white text-[#0D0D0D] border border-[#0D0D0D] "
                : "bg-transparent text-[#0D0D0D] border border-[#E5E0D8] ")
        +
        (size === "large" ? ' w-full text-[13px] px-6 py-3.5' : 'text-xs px-5 py-2.5')
    +(disable?' ':' cursor-pointer')

    return (
        <button
            disabled={disable}
            type={type}
            onClick={onClick}
            className={classes}
        >
            {children}
        </button>
    );
}
