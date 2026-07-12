import Dropdown from "../../../components/ui/Dropdown.tsx";
import type {SortOption} from "../../../types/sortOption.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {filterActions} from "../../../store/filter-slice.tsx";

export default function SortFilter() {
    const sortOptions: SortOption[] = [
        {
            id: '1',
            title: "Price: Low to High",
            sortBy: "price",
            order: "asc",
        },
        {
            id: '2',
            title: "Price: High to Low",
            sortBy: "price",
            order: "desc",
        },
        {
            id: '3',
            title: "Newest First",
            sortBy: "createdDate",
            order: "desc",
        },
        {
            id: '4',
            title: "Best Rated",
            sortBy: "rating",
            order: "desc",
        },
    ];
    const dispatch = useDispatch();
    const selectedSort = useSelector((state: RootState) => state.filter.sort)

    function onSelectionChange(option: SortOption) {
        dispatch(filterActions.changeSort(option));
    }

    return <Dropdown title={selectedSort.title} options={sortOptions} onChange={onSelectionChange}/>

}