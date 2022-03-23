import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { render } from '@testing-library/react';

import DepositPage from './DepositPage';

describe('DepositPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReactIntlProvider>
                <DepositPage />
            </ReactIntlProvider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
