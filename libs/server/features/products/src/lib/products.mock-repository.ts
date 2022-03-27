import { Product } from './entities/product.entity';

export const productsMockRepository = {
    products: [],
    async save(product: Product) {
        this.products.push(product);
        return product;
    },
    async find() {
        return this.products;
    },
    async findOne(filter: any) {
        const { _id } = filter;
        return this.products.find(({ _id: id }) => _id === id);
    },
    async update(filter: any, updates: Partial<Product>) {
        const { _id } = filter;
        const product = await this.findOne({ _id });
        this.products = this.products.filter(({ _id: id }) => id !== _id);
        const updated = {
            ...product,
            ...updates,
        };
        this.products.push(updated);
        return updated;
    },
    async delete(filter: any) {
        const { _id } = filter;
        const product = await this.findOne({ _id });
        this.products = this.products.filter(({ _id: id }) => id !== _id);
        return product;
    },
};
