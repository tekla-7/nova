import type {Category} from "../types/category.ts";
import type {Product, ProductsResponse} from "../types/product.ts";
import {PRODUCTS_API_URL} from '../config.ts'

import {apiClient} from "./apiClient.ts";


async function fetchCategories(): Promise<Category[]> {
    const response = await apiClient(`/categories` ,undefined ,PRODUCTS_API_URL);
    return await response.json();
}

async function fetchProducts(): Promise<ProductsResponse> {
    const response = await apiClient(`?limit=0`,undefined,PRODUCTS_API_URL);
    return await response.json();
}

export async function fetchProduct(id: string): Promise<Product> {
    const response = await apiClient(`/${id}`, undefined, PRODUCTS_API_URL);
    return await response.json();
}




export const fetchCountries = async () => {
    const response = await apiClient(`reference-data/countries`)
    if (!response.ok) {
        return []
    }

    return await response.json()
}
export const fetchState = async (code: string) => {
    const response = await apiClient(`reference-data/states/${code}`)
    return await response.json()
}
export const fetchCity = async (cCode: string, sCode: string) => {
    const response = await apiClient(`reference-data/city/${cCode}/${sCode}`)

    return await response.json()
}



export {fetchCategories, fetchProducts,};