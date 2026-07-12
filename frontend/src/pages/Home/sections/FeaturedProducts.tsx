import {useProducts} from "../../../hooks/useProducts.ts";
import ErrorBlock from "../../../components/ui/ErrorBlock.tsx";
import {allowedCategories} from "../../../constants/allowedCategories.ts";
import FeaturedProductItem from "./FeaturedProductItem.tsx";

export default function FeaturedProducts() {
    const {
        data,
        isPending,
        isError,
        error
    } = useProducts()
    let content;
    if (isError) {
        content = (
            <ErrorBlock title="An error occurred" message={error?.message || 'error'}/>
        );
    }
    if (isPending) {
        content = (<>
                <div className="aspect-[3/4] bg- bg-[#F5F3EE]  max-h-[270px] mb-2.5 rounded-lg w-full object-cover bg-black/40 "></div>
                <div className="aspect-[3/4] max-h-[270px]  bg-[#F5F3EE]  mb-2.5 rounded-lg w-full object-cover bg-black/40 "></div>
                <div className="aspect-[3/4] max-h-[270px]  bg-[#F5F3EE]  mb-2.5 rounded-lg w-full object-cover bg-black/40 "></div>
            </>
        )
    }
    if (data?.products && data?.products.length > 0) {
        const featuredProducts = data?.products.filter(product => allowedCategories.includes(product.category)).sort((a, b) => a.rating - b.rating).slice(0,3);
        content = (
            <>
                {featuredProducts.map((product) => (
                    <FeaturedProductItem
                        event={product}
                        key={product.id}
                    />
                ))}
            </>
        )
    }

    return <div className='pt-1 mb-8'>
        <div className='flex items-center justify-between mb-5'>
            <p className='text-[20px] tracking-tight'>Featured this week</p>
            <a href='/' className='text-xs text-[#9A9A9A] cursor-pointer tracking-widest border-b border-[9A9A9A]'>View
                all</a>
        </div>
        <div className='grid grid-cols-3 gap-2.5'>{content}</div>
    </div>
}