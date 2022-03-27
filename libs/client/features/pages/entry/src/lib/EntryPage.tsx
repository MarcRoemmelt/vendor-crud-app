import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { CustomerRegister, VendorRegister, useAuthModals, useAuthStore } from '@mr/client/features/authentication';
import { IcButton } from '@mr/client/ui/ic-button';
import { StyledPageDescription, StyledPageTitle } from '@mr/shared/ui/text';
import { StyledPage } from '@mr/client/ui/small-components';
import { useUserStore } from '@mr/client/features/user';
import { Role } from '@mr/client/data-access/user-store';

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
function Buttons() {
    const store = useAuthStore();
    const showVendorRegister = () => {
        store.setActiveModal(VendorRegister.key);
    };
    const showCustomerRegister = () => {
        store.setActiveModal(CustomerRegister.key);
    };
    return (
        <StyledButtons>
            <IcButton onPress={showVendorRegister} size="xl">
                <FormattedMessage id="pages.entry.buttons.vendor" defaultMessage="I'm a vendor" />
            </IcButton>

            <IcButton onPress={showCustomerRegister} size="xl">
                <FormattedMessage id="pages.entry.buttons.customer" defaultMessage="I'm a customer" />
            </IcButton>
        </StyledButtons>
    );
}

const StyledEntryPage = styled(StyledPage)`
    margin-top: 160px;
`;
export const EntryPage = observer(() => {
    useAuthModals();
    useRedirect();

    return (
        <StyledEntryPage>
            <HeaderSection />
            <Buttons />
        </StyledEntryPage>
    );
});

export default EntryPage;

const useRedirect = () => {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const { push } = useRouter();

    useEffect(() => {
        if (!authStore.isAuthenticated) return;
        switch (userStore.currentUser.role) {
            case Role.Seller:
                push('/sell');
                break;
            case Role.Buyer:
            case Role.Admin:
                push('/buy');
        }
    }, [authStore, authStore.isAuthenticated, push, userStore, userStore.currentUser.role]);
};
