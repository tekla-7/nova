export type SortOption = {
    id: string;
    title: string;
    sortBy: "price" | "createdDate" | "rating";
    order: "asc" | "desc";
};