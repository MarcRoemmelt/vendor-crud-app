import React from 'react';

import { authApi } from '@mr/client/data-access/auth-api';
import { createAuthStore } from '@mr/client/data-access/auth-store';
import { productsApi } from '@mr/client/data-access/products-api';
import { createProductsStore } from '@mr/client/data-access/products-store';
import { userApi } from '@mr/client/data-access/user-api';
import { createUserStore } from '@mr/client/data-access/user-store';
import { configureSuperAgent } from '@mr/shared/data-access/superagent';

import { config } from '../config/config.dev';

const requests = configureSuperAgent({
    API_ROOT: config.apiRoot,
});

const Auth = authApi(requests);
const Products = productsApi(requests);
const User = userApi(requests);
const api = { Auth, Products, User };

export const stores = {
    auth: createAuthStore({ api }),
    products: createProductsStore({ api }),
    user: createUserStore({ api }),
};

export const StoreContext = React.createContext(stores);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};
