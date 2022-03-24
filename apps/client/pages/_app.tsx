import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { ModalProvider } from '@mr/shared/ui/use-modal';
import { AuthStoreProvider } from '@mr/client/features/authentication';

import { defaultTheme } from '../theme/defaultTheme';
import { GlobalStyles } from '../theme/GlobalStyles';
import { config } from '../config/config.dev';

// eslint-disable-next-line max-lines-per-function
function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <ReactIntlProvider>
            <ThemeProvider theme={defaultTheme}>
                <AuthStoreProvider config={config}>
                    <ModalProvider>
                        <Head>
                            <title>Welcome to MVP-Factory Vendor!</title>
                        </Head>
                        <main className="app">
                            <GlobalStyles />
                            <Component {...pageProps} />
                        </main>
                    </ModalProvider>
                </AuthStoreProvider>
            </ThemeProvider>
        </ReactIntlProvider>
    );
}

export default CustomApp;
