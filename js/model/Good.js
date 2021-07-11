import idGenerator from "../utils/idGenerator.js";

export default class Good {
    constructor({image, title, description, price}) {
        this.id = idGenerator();
        this.image = image;
        this.title = title;
        this.description = description;
        this._price = price;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        return this._price = value;
    }
}