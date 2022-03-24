import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { StyledPageTitle } from '@mr/shared/ui/text';

import { RegisterForm } from './RegisterForm/RegisterForm';
import { Role } from '@mr/client/data-access/user-api';
import { useLogin } from './useLogin';

const StyledCustomerRegister = styled.div``;

interface ICustomerRegisterProps {
    onClose: () => void;
}
export function CustomerRegister({ onClose }: ICustomerRegisterProps) {
    const { present } = useLogin();

    const goToLogin = () => {
        onClose();
        present();
    };

    return (
        <StyledCustomerRegister>
            <StyledPageTitle>
                <FormattedMessage id="auth.register.Customer.title" defaultMessage="Register (Customer)" />
            </StyledPageTitle>

            <RegisterForm goToLogin={goToLogin} role={Role.Buyer} />
        </StyledCustomerRegister>
    );
}
