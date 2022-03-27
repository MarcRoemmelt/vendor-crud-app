import { createContext, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { createUserApi } from '@mr/client/data-access/user-api';
import { createUserStore } from '@mr/client/data-access/user-store';
import { configureSuperAgent } from '@mr/shared/data-access/superagent';
import { useAuthStore } from '@mr/client/features/authentication';

type UserStore = ReturnType<typeof createUserStore>;
export const UserStoreContext = createContext<UserStore | undefined>(undefined);

export interface IStoreProviderProps {
    children: React.ReactNode;
    config: {
        apiRoot: string;
    };
}
export const UserStoreProvider = observer(({ children, config }: IStoreProviderProps) => {
    const authStore = useAuthStore();
    const requests = configureSuperAgent({
        API_ROOT: config.apiRoot,
    });

    const api = createUserApi(requests);
    const store = createUserStore({ api, authStore });

    useEffect(() => {
        store.checkUser(authStore.currentUser as any);
    }, [authStore, store]);

    return <UserStoreContext.Provider value={store}>{children}</UserStoreContext.Provider>;
});

export const useUserStore = (): UserStore => {
    const UserStore = useContext(UserStoreContext);
    if (!UserStore) {
        throw new Error('useUserStore must be called inside UserStoreContext');
    }
    return UserStore;
};
