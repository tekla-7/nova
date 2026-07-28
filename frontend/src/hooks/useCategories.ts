import {useQuery} from '@tanstack/react-query';
import {fetchCategories} from "../services/product.api.ts";
import {CACHE_TIME, QUERY_KEYS} from "../constants/queryKeys.ts";

export function useCategories() {
    return useQuery({
        queryKey: QUERY_KEYS.CATEGORY,
        queryFn: fetchCategories,
        staleTime: CACHE_TIME.THREE_HOUR,

    });
}