import type { BuyerErrors, IBuyer } from '../../types';

const emptyBuyer: IBuyer = { payment: '', address: '', email: '', phone: '' };

export class Buyer {
    private data: IBuyer = { ...emptyBuyer };

    update(fields: Partial<IBuyer>): void {
        this.data = {
            payment: fields.payment ?? this.data.payment,
            address: fields.address ?? this.data.address,
            email: fields.email ?? this.data.email,
            phone: fields.phone ?? this.data.phone,
        };
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
