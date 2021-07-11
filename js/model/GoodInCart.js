import Good from "./Good.js";

export default class GoodInCart extends Good{
    constructor(data, quantity = 1) {
        super(data);
        this.id = data.id;

        this.quantity = quantity;
    }

    get price() {
        return this._price * this.quantity;
    }

    add() {
        this.quantity++;
    }
}