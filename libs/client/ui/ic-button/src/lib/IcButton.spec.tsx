import { render } from '@testing-library/react';

import IcButton from './IcButton';

describe('IcButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<IcButton />);
        expect(baseElement).toBeTruthy();
    });
});
