import {useQuery} from "@tanstack/react-query";
import { fetchProducts} from "../utils/http.ts";
import {allowedCategories} from "../constants/allowedCategories.ts";
import {shuffle} from "../utils/shuffle.ts";

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 3600000,
        select: (data) => {
            const allReviews = data.products
                .filter((p) => allowedCategories.includes(p.category))
                .flatMap((p) => p.reviews ?? [])
                .filter(r=>r.rating>3)

            const unique = Array.from(
                new Map(
                    allReviews.map((r) => [r.reviewerName, r])
                ).values()
            );

            return {
                ...data,
                featuredReviews: shuffle(unique).slice(0, 9),
            };
        },
    });

}