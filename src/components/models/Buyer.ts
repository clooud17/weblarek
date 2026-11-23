import type { BuyerErrors, IBuyer } from '../../types';

const emptyBuyer: IBuyer = { payment: '', address: '', email: '', phone: '' };

export class Buyer {
    private data: IBuyer = { ...emptyBuyer };

    update(fields: Partial<IBuyer>): void {
        this.data = { ...this.data, ...fields };
    }

    getData(): IBuyer {
        return { ...this.data };
    }

    clear(): void {
        this.data = { ...emptyBuyer };
    }

    validate(): BuyerErrors {
        const errors: BuyerErrors = {};
        if (!this.data.payment) errors.payment = 'Выберите способ оплаты';
        if (!this.data.address.trim()) errors.address = 'Введите адрес доставки';
        if (!this.data.email.trim()) errors.email = 'Введите электронную почту';
        if (!this.data.phone.trim()) errors.phone = 'Введите телефон';
        return errors;
    }
}
