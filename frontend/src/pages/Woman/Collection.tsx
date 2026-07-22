import {NavLink, useLocation} from "react-router-dom";
import CategoryFilter from "./sections/CategoryFilter.tsx";
import PriceRangeFilter from "./sections/PriceRangeFilter.tsx";
import RatingFilter from "./sections/RatingFilter.tsx";
import SortFilter from "./sections/SortFilter.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../store";
import {useProducts} from "../../hooks/useProducts.ts";
import {allowedCategories, menCategories, womenCategories} from "../../constants/allowedCategories.ts";
import FeaturedProductItem from "../Home/sections/FeaturedProductItem.tsx";
import {useMemo} from "react";
import {filterActions} from "../../store/filter-slice.tsx";

export default function CollectionPage() {
    const {data} = useProducts();
    const dispatch = useDispatch();
    const location = useLocation();
    const pageName = location.pathname;
    const filters = useSelector((state: RootState) => state.filter);
    const filteredProducts = useMemo(() => {
        if (!data) return [];
        let products = [...data.products];

        switch (pageName) {
            case "/women":
                products = products.filter(product =>
                    womenCategories.includes(product.category)
                );
                break;

            case "/men":
                products = products.filter(product =>
                    menCategories.includes(product.category)
                );
                break;

            case "/sale":
                products = products.filter(product => allowedCategories.includes(product.category))
                break;

            case "/new-in":
                products = products
                    .filter(product => allowedCategories.includes(product.category))
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 20);
                break;
        }


        if (filters.categories.length > 0) {
            products = products.filter(product =>
                filters.categories.includes(product.category)
            );
        }

        products = products.filter(product =>
            product.price >= filters.minPrice &&
            product.price <= filters.maxPrice
        );


        if (filters.rating > 0) {
            products = products.filter(product =>
                product.rating >= filters.rating
            );
        }

        products.sort((a, b) => {
            switch (filters.sort.sortBy) {
                case "price":
                    return filters.sort.order === "asc"
                        ? a.price - b.price
                        : b.price - a.price;

                case "rating":
                    return filters.sort.order === "asc"
                        ? a.rating - b.rating
                        : b.rating - a.rating;

                default:
                    return 0;
            }
        });

        return products;
    }, [data, filters, pageName]);

    function clearAllFilter() {
        dispatch(filterActions.clearAllFilters())
    }

    return <section className='flex flex-col w-full'>
        <div className='flex items-center gap-1 border-b border-[#E5E0D8] py-3 px-6'>
            <NavLink className='text-xs text-[#9A9A9A] cursor-pointer' to='/'>Home</NavLink>
            <p className='text-xs text-[#E5E0D8]'>/</p>
            <p className='text-xs text-[#0D0D0D]'>{pageName.slice(1)}</p>
        </div>
        <div className='grid grid-cols-[200px_1fr] min-h-[70vh]'>
            <div className='border-r border-[#E5E0D8] py-5 px-4 h-full'>
                <p className='text-[15px] pb-5'>Filters</p>
                <CategoryFilter/>
                <PriceRangeFilter/>
                <RatingFilter/>
                <button
                    onClick={clearAllFilter}
                    className='bg-transparent border border-[#E5E0D8] rounded text-xs text-[#9A9A9A] cursor-pointer mt-3 w-full h-8 '>Clear
                    all filters
                </button>
            </div>
            <main className='p-5 flex flex-col'>
                <div className='flex items-center justify-between'>
                    <p className='text-[13px] text-[#4A4A4A]'><span
                        className='text-[#0D0D0D] font-semibold'>{filteredProducts.length}</span> products</p>
                    <div className='flex items-center gap-2.5'>
                        {/*<div className='flex items-center gap-1'>*/}
                        {/*    <button*/}
                        {/*        className='w-7 h-7 border border-[#E5E0D8] rounded cursor-pointer flex items-center justify-center'>*/}
                        {/*        <LayoutGrid size={14} className='text-[#9A9A9A]'/></button>*/}
                        {/*    <button*/}
                        {/*        className='w-7 h-7 border border-[#0D0D0D] rounded cursor-pointer flex items-center justify-center'>*/}
                        {/*        <StretchHorizontal size={12} className='text-[#0D0D0D]'/></button>*/}


                        {/*</div>*/}
                        <SortFilter/>
                    </div>

                </div>
                <div className='grid grid-cols-4 gap-x-2.5 gap-y-4 mt-6'>
                    {filteredProducts?.map((product) => (
                        <FeaturedProductItem
                            event={product}
                            key={product.id}
                        />
                    ))}
                </div>
            </main>
        </div>
    </section>


}