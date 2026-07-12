export interface Step {
    id: number;
    title: string;
    isComplete: boolean;
    isActive: boolean;
    isBlocked: boolean;
}

export interface ShoppingMethod {
    id: number,
    title: string,
    price: number,
    description: string
}