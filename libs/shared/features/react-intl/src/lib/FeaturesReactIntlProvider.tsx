import React, { ReactNode, useState } from 'react';
import { IntlConfig, IntlProvider } from 'react-intl';

enum LOCALES {
    EN_US = 'en-US',
}
const defaultLocale = LOCALES.EN_US;

export const ReactIntlProvider: React.FC<{
    children: ReactNode;
    currentLocale?: string;
    messages?: IntlConfig['messages'];
}> = ({ children, currentLocale, messages }) => {
    const [locale] = useState(
        currentLocale || typeof window !== 'undefined' ? window.navigator.language : defaultLocale,
    );

    return (
        <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
            {children}
        </IntlProvider>
    );
};
