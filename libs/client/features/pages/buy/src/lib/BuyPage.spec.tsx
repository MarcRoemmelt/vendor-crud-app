import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { render } from '@testing-library/react';

import BuyPage from './BuyPage';

describe('BuyPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReactIntlProvider>
                <BuyPage />
            </ReactIntlProvider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
