import './scss/styles.scss';
import { Api } from './components/base/Api';
import { Catalog } from './components/models/Catalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { ShopApi } from './components/ShopApi';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const catalog = new Catalog();
const basket = new Basket();
const buyer = new Buyer();
const api = new Api(API_URL);
const shopApi = new ShopApi(api);

function checkModels(): void {
    catalog.setItems(apiProducts.items);
    const [first, second, unavailable] = catalog.getItems();
    console.log('Учебный каталог', catalog.getItems());
    console.log('Поиск по id', catalog.getById(first.id));
    catalog.select(first);
    console.log('Товар для просмотра', catalog.getSelected());

    basket.add(first);
    basket.add(second);
    basket.add(first);
    basket.add(unavailable);
    console.log('Корзина после добавления двух доступных товаров, повтора и товара без цены', basket.getItems());
    console.log('Первый товар в корзине', basket.has(first.id));
    console.log('Количество товаров', basket.getCount());
    console.log('Сумма корзины', basket.getTotal());
    basket.remove(first);
    console.log('После удаления первого товара', basket.getItems());
    basket.clear();
    console.log('После очистки корзины', basket.getItems());

    console.log('Ошибки пустой формы', buyer.validate());
    buyer.update({ payment: 'card', address: 'Учебная улица, 1' });
    console.log('После первого шага остались ошибки контактов', buyer.validate());
    buyer.update({ email: 'student@example.com', phone: '+79990000000' });
    console.log('Данные после двух шагов', buyer.getData());
    console.log('Ошибки заполненной формы', buyer.validate());
    buyer.clear();
    console.log('После очистки данных покупателя', buyer.getData());
    catalog.setItems([]);
}

checkModels();
shopApi.getProducts()
    .then(({ items }) => {
        catalog.setItems(items);
        console.log('Каталог с сервера', catalog.getItems());
    })
    .catch((error: unknown) => console.error('Не удалось загрузить каталог', error));
