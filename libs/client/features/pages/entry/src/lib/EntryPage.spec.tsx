import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { render } from '@testing-library/react';

import EntryPage from './EntryPage';

describe('EntryPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReactIntlProvider>
                <EntryPage />
            </ReactIntlProvider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
