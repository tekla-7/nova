import type {ComponentProps, ReactNode} from "react";

type FormatDateProps = ComponentProps<"p"> & {
    date: string;
    showTime?: boolean;
    children?: ReactNode;
};
export default function FormatDate({date,showTime,children, ...prop}:FormatDateProps) {

    const format = (date: string) => {
        if(showTime){
            return new Date(date).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
        }
        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }
    return <p {...prop}>
        {children}  {format(date)}
    </p>
}