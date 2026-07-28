import {apiJson} from "../utils/apiClient.ts";
import type {Category} from "../types/category.ts";
import {PRODUCTS_API_URL} from "../config.ts";
import type {Product, ProductsResponse} from "../types/product.ts";

export function fetchCategories() {
    return apiJson<Category[]>("/categories", {
        baseUrl: PRODUCTS_API_URL,
    });
}

export function fetchProducts() {
    return apiJson<ProductsResponse>("?limit=0", {
        baseUrl: PRODUCTS_API_URL,
    });
}

export function fetchProduct(id: string) {
    return apiJson<Product>(`/${id}`, {
        baseUrl: PRODUCTS_API_URL,
    });
}