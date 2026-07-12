import {useCategories} from "../../../hooks/useCategories.ts";
import CategoryItem from "./CategoryItem.tsx";
import ErrorBlock from "../../../components/ui/ErrorBlock.tsx";

export default function CategoryStrip() {
    const {
        data: categories,
        isPending,
        isError,
        error
    } = useCategories()

    let content;

    if (isPending) {
        // content = <LoadingIndicator/>;
    }

    if (isError) {
        content = (
            <ErrorBlock title="An error occurred" message={error?.message || 'error'}/>
        );
    }

    if (categories) {
        const filtered = categories.filter(cat =>
            ['sunglasses', 'womens-bags', 'mens-shoes', 'womens-dresses'].includes(cat.slug)
        );
        content = (
            <div className='grid grid-cols-4 gap-2.5'>
                {filtered.slice(0, 4).map((event) => (
                    <CategoryItem key={event.slug} event={event} isPending={false}></CategoryItem>

                ))}
            </div>
        );
    }
    return <div className='pt-1 mb-8'>
        <div className='flex items-center justify-between mb-5'>
            <p className='text-lg tracking-tight'>Shop by category</p>
            <a href='/' className='text-xs text-[#9A9A9A] cursor-pointer tracking-widest border-b border-[9A9A9A]'>All
                categories</a>
        </div>
        {content}
    </div>
}