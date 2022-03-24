import { createContext, useContext } from 'react';

import { createAuthApi } from '@mr/client/data-access/auth-api';
import { createAuthStore } from '@mr/client/data-access/auth-store';
import { configureSuperAgent } from '@mr/shared/data-access/superagent';

type AuthStore = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStore | undefined>(undefined);

export interface IStoreProviderProps {
    children: React.ReactNode;
    config: {
        apiRoot: string;
    };
}
export const AuthStoreProvider = ({ children, config }: IStoreProviderProps) => {
    const requests = configureSuperAgent({
        API_ROOT: config.apiRoot,
    });

    const api = createAuthApi(requests);
    const store = createAuthStore({ api });

    return <AuthStoreContext.Provider value={store}>{children}</AuthStoreContext.Provider>;
};

export const useAuthStore = (): AuthStore => {
    const authStore = useContext(AuthStoreContext);
    if (!authStore) {
        throw new Error('useAuthStore must be called inside AuthStoreContext');
    }
    return authStore;
};
