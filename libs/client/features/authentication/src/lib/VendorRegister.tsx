import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { StyledPageTitle } from '@mr/shared/ui/text';
import { Role } from '@mr/client/data-access/user-api';

import { RegisterForm } from './RegisterForm/RegisterForm';
import { useLogin } from './useLogin';

const StyledVendorRegister = styled.div``;

interface IVendorRegisterProps {
    onClose: () => void;
}
export function VendorRegister({ onClose }: IVendorRegisterProps) {
    const { present } = useLogin();

    const goToLogin = () => {
        onClose();
        present();
    };

    return (
        <StyledVendorRegister>
            <StyledPageTitle>
                <FormattedMessage id="auth.register.vendor.title" defaultMessage="Register (Vendor)" />
            </StyledPageTitle>

            <RegisterForm goToLogin={goToLogin} role={Role.Seller} />
        </StyledVendorRegister>
    );
}
