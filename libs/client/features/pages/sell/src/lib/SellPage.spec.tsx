import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { render } from '@testing-library/react';

import SellPage from './SellPage';

describe('SellPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReactIntlProvider>
                <SellPage />
            </ReactIntlProvider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
