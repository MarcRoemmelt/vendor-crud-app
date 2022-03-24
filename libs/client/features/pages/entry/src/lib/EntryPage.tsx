import { IcButton } from '@mr/client/ui/ic-button';
import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { useVendorRegister, useCustomerRegister } from '@mr/client/features/authentication';

const StyledPage = styled.div`
    max-width: 1200px;
    min-height: 100vh;
    padding-bottom: 20%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const StyledPageTitle = styled.h1`
    width: 100%;
    display: flex;
    justify-content: center;

    text-align: center;
    font-weight: bold;
    font-size: 3em;
    color: ${({ theme }) => theme.primaryColor};
`;
const StyledPageDescription = styled.h2`
    max-width: 600px;

    font-size: 1.6em;
    text-align: center;
    color: ${({ theme }) => theme.primaryColor};
`;

function HeaderSection() {
    return (
        <Fragment>
            <StyledPageTitle>
                <FormattedMessage id="pages.entry.title" defaultMessage="Welcome to the MVP vending machine" />
            </StyledPageTitle>

            <StyledPageDescription>
                <FormattedMessage
                    id="pages.entry.title"
                    defaultMessage="Login as customer to buy products or sign up as vendor to sell your goods!"
                />
            </StyledPageDescription>
        </Fragment>
    );
}

const StyledButtons = styled.div`
    margin: 50px;
`;

interface IButtonProps {
    showVendorRegister: () => void;
    showCustomerRegister: () => void;
}
function Buttons({ showVendorRegister, showCustomerRegister }: IButtonProps) {
    return (
        <StyledButtons>
            <IcButton onClick={showVendorRegister} size="xl">
                <FormattedMessage id="pages.entry.buttons.vendor" defaultMessage="I'm a vendor" />
            </IcButton>

            <IcButton onClick={showCustomerRegister} size="xl">
                <FormattedMessage id="pages.entry.buttons.customer" defaultMessage="I'm a customer" />
            </IcButton>
        </StyledButtons>
    );
}

export function EntryPage() {
    const { present: showVendorRegister } = useVendorRegister();
    const { present: showCustomerRegister } = useCustomerRegister();

    return (
        <StyledPage>
            <HeaderSection />
            <Buttons showVendorRegister={showVendorRegister} showCustomerRegister={showCustomerRegister} />
        </StyledPage>
    );
}

export default EntryPage;
