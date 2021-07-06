export default class GoodListInCart {
    constructor(goods) {
        this._card = card;
    }
    // По идеи он должен брать список товаров из АПИ
    // Чтобы они сохранялись после обновления страницы
    get() {

    }

    add(good) {
        this.goods.push(good);
    }

    remove(id) {
        let indexID = this.goods.findIndex(good => good.id === id);

        this.goods.splice(indexID, 1);
    }

    getCalculateAmount() {
        let summ = 0;
        this.goods.forEach(priceItem => {
            summ += +priceItem._price;
        })
        return summ.toFixed(2);
    }


}