import { ReactIntlProvider } from '@mr/shared/features/react-intl';
import { render } from '@testing-library/react';

import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(
            <ReactIntlProvider>
                <ProfilePage />
            </ReactIntlProvider>,
        );
        expect(baseElement).toBeTruthy();
    });
});
