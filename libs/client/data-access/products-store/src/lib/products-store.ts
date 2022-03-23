import { makeAutoObservable } from 'mobx';

export type ProductsStoreOptions = {
    api: any;
};
export function createProductsStore({ api: _api }: ProductsStoreOptions) {
    return makeAutoObservable({
        /* Products */
        /* FetchAll (paginated) */
        /* Buy */
        /* Create */
        /* Delete */
        /* Update */
    });
}
