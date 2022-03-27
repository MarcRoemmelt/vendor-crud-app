import { createContext, useContext } from 'react';

import { createProductsApi } from '@mr/client/data-access/products-api';
import { createProductsStore } from '@mr/client/data-access/products-store';
import { configureSuperAgent } from '@mr/shared/data-access/superagent';
import { useUserStore } from '@mr/client/features/user';

type ProductsStore = ReturnType<typeof createProductsStore>;
export const ProductsStoreContext = createContext<ProductsStore | undefined>(undefined);

export interface IStoreProviderProps {
    children: React.ReactNode;
    config: {
        apiRoot: string;
    };
}
export const ProductsStoreProvider = ({ children, config }: IStoreProviderProps) => {
    const userStore = useUserStore();
    const requests = configureSuperAgent({
        API_ROOT: config.apiRoot,
    });

    const api = createProductsApi(requests);
    const store = createProductsStore({ api, userStore });

    return <ProductsStoreContext.Provider value={store}>{children}</ProductsStoreContext.Provider>;
};

export const useProductsStore = (): ProductsStore => {
    const ProductsStore = useContext(ProductsStoreContext);
    if (!ProductsStore) {
        throw new Error('useProductsStore must be called inside ProductsStoreContext');
    }
    return ProductsStore;
};
