import type { IApi, IOrder, IOrderResult, IProductList } from '../types';

export class ShopApi {
    constructor(private readonly api: IApi) {}

    getProducts(): Promise<IProductList> {
        return this.api.get<IProductList>('/product/');
    }

    submitOrder(order: IOrder): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order/', order);
    }
}
