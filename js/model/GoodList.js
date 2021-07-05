import Good from "./Good.js";

export default class GoodList {
    constructor(goods) {
        this.goods = goods.map(item => new Good(item));
    }

    get() {
        return this.goods;
    }

    add(good) {
        this.goods.push(good);
    }

    remove(id) {
        let indexID = this.goods.findIndex(good => good.id === id);

        this.goods.splice(indexID, 1);
    }
}