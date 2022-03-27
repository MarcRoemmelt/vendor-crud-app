import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { createAuthApi } from '@mr/client/data-access/auth-api';
import { createAuthStore } from '@mr/client/data-access/auth-store';
import { configureSuperAgent } from '@mr/shared/data-access/superagent';
import { Spinner } from '@mr/client/ui/small-components';

export type AuthStore = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStore | undefined>(undefined);

export interface IStoreProviderProps {
    children: React.ReactNode;
    config: {
        apiRoot: string;
    };
}
export const AuthStoreProvider = observer(({ children, config }: IStoreProviderProps) => {
    const [isLoading, setLoading] = useState(true);
    const store = useMemo(() => {
        const requests = configureSuperAgent({
            API_ROOT: config.apiRoot,
        });
        const api = createAuthApi(requests);
        return createAuthStore({ api });
    }, [config]);

    useEffect(() => {
        store.refreshSession().then(() => setLoading(false));
    }, [store]);

    return (
        <AuthStoreContext.Provider value={store}>
            {isLoading ? <Spinner height="80vh" width="100%" /> : children}
        </AuthStoreContext.Provider>
    );
});

export const useAuthStore = (): AuthStore => {
    const authStore = useContext(AuthStoreContext);
    if (!authStore) {
        throw new Error('useAuthStore must be called inside AuthStoreContext');
    }
    return authStore;
};
