export interface Cart {
    product: {
        productId: number,
        title: string,
        price: number,
        brand: string,
        image: string
    },
    quantity: number,
    size: string,
    color: string
}