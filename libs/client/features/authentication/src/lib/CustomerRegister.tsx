import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { StyledPageTitle } from '@mr/shared/ui/text';

import { RegisterForm } from './RegisterForm/RegisterForm';
import { Role } from '@mr/client/data-access/user-api';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';

const StyledCustomerRegister = styled.div``;

type ICustomerRegisterProps = ModalComponentProps;
export function CustomerRegister(props: ICustomerRegisterProps) {
    return (
        <StyledCustomerRegister>
            <StyledPageTitle>
                <FormattedMessage id="auth.register.Customer.title" defaultMessage="Register (Customer)" />
            </StyledPageTitle>

            <RegisterForm {...props} role={Role.Buyer} />
        </StyledCustomerRegister>
    );
}
CustomerRegister.key = 'customer-register';
