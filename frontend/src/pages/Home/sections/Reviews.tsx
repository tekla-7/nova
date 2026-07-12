import {useProducts} from "../../../hooks/useProducts.ts";
import ErrorBlock from "../../../components/ui/ErrorBlock.tsx";
import FeaturedProductItem from "./FeaturedProductItem.tsx";
import ReviewCarousel from "./ReviewCarousel.tsx";

export default function Reviews() {
    const {
        data,
        isPending,
        isError,
        error
    } = useProducts();
    const reviews = data?.featuredReviews ?? [];
    let content;
    if (isError) {
        content = (
            <ErrorBlock title="An error occurred" message={error?.message || 'error'}/>
        );
    }
    if (isPending) {
        content = (<p>....</p>)
    }
    if (reviews && reviews.length > 0) {
        content = (
            <ReviewCarousel reviews={reviews}/>
        )
    }

    return <div className='pt-1 my-8'>
        <div className='flex items-center justify-between mb-5'>
            <p className='text-[20px] tracking-tight'>What customers say</p>

        </div>
        {content}
    </div>

}
