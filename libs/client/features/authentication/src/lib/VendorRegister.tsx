import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { StyledPageTitle } from '@mr/shared/ui/text';
import { Role } from '@mr/client/data-access/user-api';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';
import { RegisterForm } from './RegisterForm/RegisterForm';

const StyledVendorRegister = styled.div``;

type IVendorRegisterProps = ModalComponentProps;

export function VendorRegister(props: IVendorRegisterProps) {
    return (
        <StyledVendorRegister>
            <StyledPageTitle>
                <FormattedMessage id="auth.register.vendor.title" defaultMessage="Register (Vendor)" />
            </StyledPageTitle>

            <RegisterForm {...props} role={Role.Seller} />
        </StyledVendorRegister>
    );
}
VendorRegister.key = 'vendor-register';
export default VendorRegister;
