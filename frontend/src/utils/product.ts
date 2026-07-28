import type {Product} from "../types/product.ts";
import {allowedCategories} from "../constants/allowedCategories.ts";
import {shuffle} from "./shuffle.ts";

export function getFeaturedReviews(products: Product[]) {
    const allReviews = products
        .filter((p) => allowedCategories.includes(p.category))
        .flatMap((p) => p.reviews ?? [])
        .filter(r => r.rating > 3)

    const unique = Array.from(
        new Map(
            allReviews.map((r) => [r.reviewerName, r])
        ).values()
    );
    return shuffle(unique).slice(0, 9)
}