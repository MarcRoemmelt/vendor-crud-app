import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { ReactIntlProvider } from '@mr/shared/features/react-intl';

import { defaultTheme } from '../theme/defaultTheme';
import { StoreProvider } from '../store/store';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <StoreProvider>
            <ReactIntlProvider>
                <ThemeProvider theme={defaultTheme}>
                    <Head>
                        <title>Welcome to indie-creators!</title>
                    </Head>
                    <main className="app">
                        <Component {...pageProps} />
                    </main>
                </ThemeProvider>
            </ReactIntlProvider>
        </StoreProvider>
    );
}

export default CustomApp;
