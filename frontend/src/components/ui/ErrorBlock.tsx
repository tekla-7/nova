type Props = {
    title: string;
    message: string;
};

export default function ErrorBlock({ title, message }:Props) {
    return (
        <div className="my-4 flex items-center gap-8 rounded bg-[#f0d9e5] p-4 text-left text-[#890b35]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#890b35] text-2xl text-white">
                !
            </div>

            <div>
                <h2 className="m-0 text-xl font-semibold">{title}</h2>
                <p className="m-0">{message}</p>
            </div>
        </div>
    );
}
