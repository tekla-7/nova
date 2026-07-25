type Props = {
    message: string;
};

export default function ErrorMessage({ message }: Props) {
    return (
        <div className="flex w-full flex-col items-center justify-center py-10">
            <div className="bg-red-50 w-full border border-red-200 rounded-lg px-5 py-4 text-center">
                <h2 className="text-sm font-semibold text-red-700">
                    Something went wrong
                </h2>

                <p className="text-xs text-red-600 mt-1">
                    {message}
                </p>
            </div>
        </div>
    );
}