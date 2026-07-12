import type {Category} from "../../../types/category.ts";

export default function CategoryItem({event,isPending}:{event:Category,isPending:boolean}) {
    return <div className="relative rounded-xl overflow-hidden">
        {!isPending && (
            <>
                <img
                    src={`/${event.slug}`}
                    alt={event.name}
                    className="h-40 w-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-black/40 p-3 text-white">
                    <h3 className="font-semibold">{event.name}</h3>
                </div>
            </>
        )}

        {isPending && <div className="h-40 bg-black/40 p-3 text-white"></div>}

    </div>
}