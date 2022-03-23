import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';
import { ReactIntlProvider } from '@mr/shared/features/react-intl';

describe('Index', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReactIntlProvider>
                <Index />
            </ReactIntlProvider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
