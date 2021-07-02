'use strict'

let cartEl = document.querySelector('.cart-menu');
// console.log(cartEl);
let cardItemEl = document.querySelector('.cardItem');

let itemEl = document.querySelectorAll('.gallery__card__hidden');
// console.log(itemEl);

let cardItems = {};

cartEl.addEventListener('click', event => {
   cardItemEl.classList.toggle('hideBlock');
});

itemEl.forEach(element => {
    element.addEventListener('click', event => {
        if (cardItemEl.classList.contains('hideBlock')){
            cardItemEl.classList.remove('hideBlock');
        }
        // эта переменная если появится возможность сразу вводить количество товаров при одном клике.
        let countItem = 1;
        let buttonData = event.currentTarget.dataset.item;
        // Записываем в обьект, обьект с выбранным товаром, если товара нет, возвращается true, если
        // пытаемся запсать обьект с товарами который есть, возвращается false
        if (isSetInfoItem(event.currentTarget)) {
            // создаем разметку с названием товара и его стоимостью
            let forms = createFormItem(buttonData);
            // добавляем в разметку количество товара и его общую стоимость
            setTotalCost(buttonData, forms, countItem);
            // Добавляем разметку в корзину для отображения выбранного товара
            writeForm(forms);
        } else {
            // Пересчитываем стоимость товара в записимости от его количества.
            recalculationTotal(buttonData);
        }
        setFormTotalSumm();
        // getCalculateAllSumm ()
    })
});

/**
 * Записываем в обьект, обьект с выбранным товаром, если товара нет, возвращается true, если
 * пытаемся запсать обьект с товарами который есть в cardItems, возвращается false
 * @param Item передается nodeList товара.
 * @returns {boolean} - true если товара нет в корзине, false если товар уже находится в корзине
 */
function isSetInfoItem(Item) {
    // Текущая кнопка
    let buttonData = Item.dataset.item;
    // Если такой товар уже находится в корзине , тогда просто увелививает его количество.
    if (cardItems[buttonData]) {
        return false;
        // console.log('Такой товар уже есть');
    } else {
        cardItems[buttonData] = {};
        // Получаю инофрмацию о товаре
        let infoItem = Item.parentNode.nextElementSibling.children;
        for (let i = 0; i < infoItem.length; i++) {
            let cardInfoType = infoItem[i].className.replace('gallery__card__', '');
            if (cardInfoType == 'text') continue;
            cardItems[buttonData][cardInfoType] = infoItem[i].innerHTML;
        }
        return true;
    }
}

/**
 * создаем разметку с названием товара и его стоимостью
 * @param {string} buttonData - data кнопки товара
 * @returns {string} - возвращаем разметку с название товара и его стоимости
 */
function createFormItem(buttonData) {
    let arrForm = [];
    for (let obj in cardItems[buttonData]) {
        // console.log(cardItems[buttonData][obj]);
        arrForm.push(`<div data-product=${buttonData} class="cardItem__info_${obj}">${cardItems[buttonData][obj]}</div>`);
    }
    return arrForm;
}

/**
 * добавляем в разметку количество товара и его общую стоимость
 * @param {string} buttonData - data кнопки товара
 * @param {massive} arrForm - массив с разметкой информации о товаре
 * @param {number} countItem - количество товара
 */
function setTotalCost(buttonData, arrForm, countItem) {
    arrForm.push(`<div data-product=${buttonData}  class="cardItem__info_count">${countItem}</div>`);
    let total = parseNumber(cardItems[buttonData].price)
    arrForm.push(`<div data-product=${buttonData} class="cardItem__info_total">${"$"+countItem * total}</div>`);
}

/**
 * Добавляем разметку в корзину для отображения выбранного товара
 * @param {massive} arrForms - готовый массив с информацией о товаре
 */
function writeForm (arrForms) {
    for (let i = 0; i < cardItemEl.children[0].children.length - 1; i++) {
        cardItemEl.children[0].children[i].insertAdjacentHTML('beforeend', arrForms[i]);
    }
}

/**
 * Пересчитываем стоимость товара в записимости от его количества.
 * @param {number} buttonData - data атрибут кнопки (идентефикатор товара)
 */
function recalculationTotal(buttonData) {
    let reCountProduct = cardItemEl.querySelectorAll(`[data-product="${buttonData}"]`);
    let price = parseNumber(reCountProduct[1].innerHTML);
    let count = reCountProduct[2];
    let total = reCountProduct[3];
    count.innerHTML++;
    total.innerHTML = '$' + (price * count.innerHTML).toFixed(2);
}

/**
 * Функция получает сумму всех заказов.
 * @returns {string} - возвращает общую сумму за все товары.
 */
function getCalculateAllSumm () {
    let summ = 0;
    let summPrice = cardItemEl.querySelectorAll('.cardItem__info_total');
    summPrice.forEach(element => {
        summ = +(+summ + +parseNumber(element.innerHTML)).toFixed(2);
    })
    return '$' + summ;
}

/**
 * Функция вставляет в конец формы корзины Общую сумму заказа.
 */
function setFormTotalSumm() {
    let summ = getCalculateAllSumm();
    if (!cardItemEl.getElementsByClassName('cardItem__info_totalSumm').length) {
        let markup = `<div class="cardItem__info_totalSumm">Общая сумма заказа: ${summ}</div>`;
        cardItemEl.insertAdjacentHTML('beforeend', markup);
    }
    else {
        cardItemEl.getElementsByClassName('cardItem__info_totalSumm')[0].innerHTML = `Общая сумма заказа: ${summ}`;
    }

};

/**
 * Функция для преобразование строку в которой есть числа и буквы в числовое значение удаляя из нее буквы.
 * @param string - строка содержащая буквы и цывры
 * @returns {number} - целочисленное значение.
 */
function parseNumber (string) {
    return +string.replace(/[^0-9.]/g, '');
}