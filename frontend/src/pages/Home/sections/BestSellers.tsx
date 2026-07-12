import Timer from "./Timer.tsx";
import {useProducts} from "../../../hooks/useProducts.ts";
import ErrorBlock from "../../../components/ui/ErrorBlock.tsx";
import {allowedCategories} from "../../../constants/allowedCategories.ts";
import BestSellersItem from "./BestSellersItem.tsx";

export default function BestSellers(){
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
        content = (
        <div className = 'grid grid-cols-3 gap-3'>
                <div className="aspect-[3/4] bg- bg-[#ffffff14]  max-h-[170px] rounded-lg p-3 border border-[#ffffff1f] overflow-hidden mb-2.5  w-full object-cover"></div>
                <div className="aspect-[3/4] max-h-[170px]  p-3 border border-[#ffffff1f] overflow-hidden bg-[#ffffff14]  mb-2.5 rounded-lg w-full object-cover "></div>
                <div className="aspect-[3/4] max-h-[170px]  p-3 border border-[#ffffff1f] overflow-hidden bg-[#ffffff14]  mb-2.5 rounded-lg w-full object-cover "></div>
            </div>
        )
    }
    if (data?.products && data?.products.length > 0) {
        const featuredProducts = data?.products.filter(product => allowedCategories.includes(product.category)).sort((a, b) => b.stock - a.stock).slice(0,3);
        content = (
            <div className='grid grid-cols-3 gap-3'>
                {featuredProducts.map((product) => (
                    <BestSellersItem
                        event={product}
                        key={product.id}
                    />
                ))}
            </div>
        )
    }
    return <section className="p-6 bg-primary rounded-xl mb-6">
        <div className="flex items-center justify-between mb-4">
            <div className='flex items-center gap-3'>
                <span className='bg-[#D63B3B] rounded px-2 py-0.5 text-[10px] text-white tracking-widest '>FLASH SALE</span>
                <p className='text-white text-base'>Today's deals</p>
            </div>
            <Timer />
        </div>
        {content}
    </section>
}