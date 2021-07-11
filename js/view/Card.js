export default class Card {
    constructor(good) {
        this._data = good;
        this._addHandlerCb = null;
    }

    getHtml() {
        return `<div class="gallery__card" id="card-${this._data.id}">
                    <div class="gallery__card__wrapper">
                        <img class="gallery__card__img" src="img/${this._data.image}" alt="fetured_Items_2">
                        <div data-item="2" class="gallery__card__hidden">
                            <label>
                                <img src="img/cart.svg" alt="">
                                <span class="gallery__addToCart">Add to Cart</span>
                            </label>
                        </div>
                    </div>
                    <div class="gallery__card__info">
                        <h3 class="gallery__card__heading">${this._data.title}</h3>
                        <span class="gallery__card__text">${this._data.description}</span>
                        <span class="gallery__card__price">$${this._data.price}</span>
                    </div>
                </div>`
    }

    render($container, target = 'beforeend') {
        $container.insertAdjacentHTML(target, this.getHtml());
        if (this._addHandler) {
            const addBtn = $container.querySelector(`#card-${this._data.id} .gallery__card__hidden`);
            addBtn.addEventListener('click', this._addHandler.bind(this));
        }
    }

    _addHandler(e) {
        this._addHandlerCb(this._data.id);
    }

    setAddHandler(callback) {
        this._addHandlerCb = callback;
    }
}