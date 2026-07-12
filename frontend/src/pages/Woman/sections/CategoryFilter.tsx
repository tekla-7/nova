import Panel from "../../../components/ui/Panel.tsx";
import {allowedCategories, menCategories, womenCategories} from "../../../constants/allowedCategories.ts";
import {type ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store";
import {filterActions} from "../../../store/filter-slice.tsx";
import {useLocation} from "react-router-dom";
import Checkbox from "../../../components/ui/Checkbox";

export default function CategoryFilter() {
    const location = useLocation();
    const pageName = location.pathname;
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.filter.categories)
    const categoriesList =
        pageName === "/women"
            ? womenCategories
            : pageName === "/men"
                ? menCategories
                : allowedCategories;

    function onCategoryChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        dispatch(filterActions.toggleCategory(value))

    }

    return <Panel title='Category'>
        <ul className='mb-2.5'>
            {categoriesList.map(el => (
                <li key={el} className='mb-1.5 cursor-pointer flex items-center gap-2'>
                    <Checkbox onChange={onCategoryChange} type='checkbox' value={el} id={el}
                           checked={categories.includes(el)}
                    />
                    <label className='cursor-pointer text-[#4A4A4A] text-xs' htmlFor={el}>{el}</label>
                </li>)
            )
            }</ul>
    </Panel>
}