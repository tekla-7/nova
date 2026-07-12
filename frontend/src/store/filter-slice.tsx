import {createSlice} from "@reduxjs/toolkit";
import type {SortOption} from "../types/sortOption.ts";

const initialFiltersState: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
    rating: number;
    sort:SortOption;
} = {
    categories: [],
    minPrice: 0,
    maxPrice: 100,
    rating: 0,
    sort:  {
        id:'1',
        title: "Price: Low to High",
        sortBy: "price",
        order: "asc",
    },

}
const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFiltersState,
    reducers: {
        toggleCategory(state, action) {
            const categories = state.categories;

            state.categories = categories.includes(action.payload)
                ? categories.filter(c => c !== action.payload)
                : [...categories, action.payload];
        },
        changeMinPrice(state, action) {
            state.minPrice = action.payload;
        },
        changeMaxPrice(state, action) {
            state.maxPrice = action.payload;
        },
        changeRating(state, action) {
            state.rating = action.payload;
        },
        changeSort(state, action) {
            state.sort = action.payload;
        },
        clearAllFilters() {
            return { ...initialFiltersState };
        }


    }
})
export const filterActions = filterSlice.actions;
export default filterSlice.reducer;