import {useQuery} from '@tanstack/react-query';
import {fetchCategories} from "../utils/http.ts";

export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        staleTime: 3600000,

    });
}