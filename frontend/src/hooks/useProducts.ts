import {useQuery} from "@tanstack/react-query";
import {fetchProducts} from "../services/product.api.ts";
import {CACHE_TIME, QUERY_KEYS} from "../constants/queryKeys.ts";
import {getFeaturedReviews} from "../utils/product.ts";

export function useProducts() {
    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS,
        queryFn: fetchProducts,
        staleTime: CACHE_TIME.ONE_HOUR,
        select: (data) => {
            return {
                ...data,
                featuredReviews: getFeaturedReviews(data.products),
            };
        },
    });

}