import { get, makeAutoObservable, ObservableMap, remove, set, values } from 'mobx';
import { toast } from 'react-toastify';

import { createProductsApi } from '@mr/client/data-access/products-api';
import { createUserStore } from '@mr/client/data-access/user-store';

import { INewProductFormValues, IProduct, IUpdateProductFormValues } from './products-store.types';

export function createProduct(product: IProduct) {
    return makeAutoObservable({
        ...product,
    });
}
export type ProductsStoreOptions = {
    api: ReturnType<typeof createProductsApi>;
    userStore: ReturnType<typeof createUserStore>;
};

// eslint-disable-next-line max-lines-per-function
export function createProductsStore({ api, userStore }: ProductsStoreOptions) {
    return makeAutoObservable({
        userStore,
        error: null as null | Error | { message: string; code: string },
        _products: new ObservableMap({}),
        get products() {
            return values(this._products);
        },
        getProduct(productId: string) {
            return get(this._products, productId);
        },
        getProductsForUser(userId: string) {
            return this.products.filter(({ sellerId }) => sellerId !== userId);
        },
        setProduct(product?: IProduct) {
            if (!product) return;
            set(this._products, { [product._id]: product });
        },
        setProducts(_products: IProduct[] = []) {
            if (_products.length === 0) return;
            const products = _products.reduce((acc, p) => ({ ...acc, [p._id]: createProduct(p) }), {});
            set(this._products, products);
        },
        async createProduct(product: INewProductFormValues) {
            const { success, data: newProduct, error } = await api.create<IProduct>(product);
            if (success) {
                this.setProduct(newProduct);
                return newProduct;
            }
            if (error) {
                toast(error.message);
            }
            return null;
        },
        async fetchProducts() {
            const { success, data: products, error } = await api.all<IProduct[]>();
            if (success) {
                this.setProducts(products);
                return products;
            }
            if (error) {
                toast(error.message);
            }
            return [];
        },
        async fetchBySellerId(sellerId: string) {
            const { success, data: products, error } = await api.bySellerId<IProduct[]>(sellerId);
            if (success) {
                this.setProducts(products);
                return products;
            }
            if (error) {
                toast(error.message);
            }
            return null;
        },
        async updateProduct(productId: string, product: IUpdateProductFormValues) {
            const { success, data: updatedProduct, error } = await api.update<IProduct>(productId, product);
            if (success) {
                this.setProduct(updatedProduct);
                return updatedProduct;
            }
            if (error) {
                toast(error.message);
            }
            return null;
        },
        async deleteProduct(productId: string) {
            const { success, error } = await api.del(productId);
            if (success) {
                remove(this._products, productId);
            }
            if (error) {
                toast(error.message);
            }
        },
        async buy(productId: string, amount: number) {
            const { success, data: _d, error } = await api.buy({ productId, amount });
            if (success) {
                await this.userStore.fetchUser();
            }
            if (error) {
                // eslint-disable-next-line no-console
                console.log(error);
                toast(error.message);
            }
        },
    });
}
