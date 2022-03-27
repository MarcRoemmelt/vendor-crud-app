import { useState, useEffect, Fragment, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from './AuthProvider';
import { observer } from 'mobx-react-lite';

const publicPaths = ['/login'];

// eslint-disable-next-line max-lines-per-function
export const RouteGuard = observer(({ children }: { children: ReactNode }) => {
    const authStore = useAuthStore();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        function authCheck(url: string) {
            // redirect to login page if accessing a private page and not logged in
            const path = url.split('?')[0];
            if (!authStore.isAuthenticated && !publicPaths.includes(path)) {
                setAuthorized(false);
                router.push({
                    pathname: '/',
                    query: { returnUrl: router.asPath },
                });
            } else {
                setAuthorized(true);
            }
        }
        authCheck(router.asPath);

        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        };
    }, [authStore.isAuthenticated, router, router.asPath, router.events]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{authorized && children}</Fragment>;
});
