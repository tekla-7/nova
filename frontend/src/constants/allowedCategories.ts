
export const menCategories = [
    "mens-watches",
    "mens-shirts",
    "sunglasses",
];
export const womenCategories = [
    "womens-watches",
    "womens-jewellery",
    "womens-bags",
    "womens-dresses",
    "womens-tops",
    "tops",
    "sunglasses",
    'beauty'
]
export const allowedCategories = [...new Set([...menCategories, ...womenCategories])];