import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { ModalProvider } from '@mr/shared/ui/use-modal';
import { AuthStoreProvider, RouteGuard } from '@mr/client/features/authentication';
import { ProductsStoreProvider } from '@mr/client/features/products';
import { UserStoreProvider } from '@mr/client/features/user';

import { defaultTheme } from '../theme/defaultTheme';
import { GlobalStyles } from '../theme/GlobalStyles';
import { config } from '../config/config.dev';
import { SharedAppRoot } from '../components/SharedAppRoot';

// eslint-disable-next-line max-lines-per-function
function CustomApp({ Component, pageProps }: AppProps<{ Component: { requiresAuth: boolean } }>) {
    const C = Component as typeof Component & { requiresAuth?: boolean };

    return (
        <ReactIntlProvider>
            <ThemeProvider theme={defaultTheme}>
                <AuthStoreProvider config={config}>
                    <UserStoreProvider config={config}>
                        <ProductsStoreProvider config={config}>
                            <ModalProvider>
                                <Head>
                                    <title>Welcome to MVP-Factory Vendor!</title>
                                </Head>
                                <main className="app">
                                    <GlobalStyles />
                                    <ToastContainer autoClose={5000} limit={3} />
                                    <SharedAppRoot>
                                        {C.requiresAuth ? (
                                            <RouteGuard>
                                                <Component {...pageProps} />
                                            </RouteGuard>
                                        ) : (
                                            <Component {...pageProps} />
                                        )}
                                    </SharedAppRoot>
                                </main>
                            </ModalProvider>
                        </ProductsStoreProvider>
                    </UserStoreProvider>
                </AuthStoreProvider>
            </ThemeProvider>
        </ReactIntlProvider>
    );
}

export default CustomApp;
