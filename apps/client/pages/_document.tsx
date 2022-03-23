import { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { GlobalStyles } from '../theme/GlobalStyles';

export default class CustomDocument extends Document<{
    styleTags: ReactElement[];
}> {
    static async getInitialProps({ renderPage }: DocumentContext) {
        const sheet = new ServerStyleSheet();

        const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />));

        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        return (
            <Html>
                <Head>{this.props.styleTags}</Head>
                <GlobalStyles />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
