import type { IProduct } from '../../types';

export class Catalog {
    private items: IProduct[] = [];
    private selected: IProduct | null = null;

    setItems(items: IProduct[]): void {
        this.items = [...items];
        this.selected = this.selected ? this.getById(this.selected.id) ?? null : null;
    }

    getItems(): IProduct[] {
        return [...this.items];
    }

    getById(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    select(product: IProduct): void {
        this.selected = this.getById(product.id) ?? null;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}
