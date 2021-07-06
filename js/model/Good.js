import idGenerator from "../utils/idGenerator.js";

export default class Good {
    constructor({image, title, description, price, discount}) {
        this.id = idGenerator();
        this.image = image;
        this.title = title;
        this.description = description;
        this._price = price;
        this._discount = discount;
    }

    getPrice() {
        return this._price - this._discount;
    }
}