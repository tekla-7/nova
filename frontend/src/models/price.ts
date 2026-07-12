export default class Prices {
    originalPrice: number;
    price: number;

    constructor(price: number = 0, discountPercentage: number = 0) {
        this.originalPrice = Number(price) / (1 - Number(discountPercentage) / 100);
        this.price = price

    }

}