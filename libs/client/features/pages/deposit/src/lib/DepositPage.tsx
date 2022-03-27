import { defineMessage, FormattedMessage, useIntl } from 'react-intl';

import { DisplayDeposit, StyledPage } from '@mr/client/ui/small-components';
import { Header, HeaderLinkProps } from '@mr/shared/ui/header';
import { StyledPageDescription, StyledPageTitle } from '@mr/shared/ui/text';
import { observer } from 'mobx-react-lite';
import { useUserStore } from '@mr/client/features/user';
import { DepositForm } from './DepositForm';
import { Fragment, useMemo } from 'react';
import { Role } from '@mr/client/data-access/user-store';
import Link from 'next/link';

const links: HeaderLinkProps[] = [
    {
        name: defineMessage({ id: 'nav.link.buy', defaultMessage: 'Buy' }),
        href: '/buy',
        icon: 'B',
    },
    {
        name: defineMessage({ id: 'nav.link.deposit', defaultMessage: 'Deposit' }),
        href: '/deposit',
        icon: 'D',
    },
    {
        name: defineMessage({ id: 'nav.link.sell', defaultMessage: 'Sell' }),
        href: '/sell',
        icon: 'S',
    },
    {
        name: defineMessage({ id: 'nav.link.profile', defaultMessage: 'Profile' }),
        href: '/profile',
        icon: 'P',
    },
];
export function DepositPage() {
    const userStore = useUserStore();

    const pageContent = useMemo(() => {
        switch (userStore.currentUser.role) {
            case Role.Admin:
            case Role.Buyer:
                return (
                    <Fragment>
                        <CurrentBalance />
                        <DepositForm />
                    </Fragment>
                );
            case Role.Seller:
                return <SellerFallback />;
            default:
                return null;
        }
    }, [userStore]);

    return (
        <StyledPage>
            <Header links={links} />
            <StyledPageTitle>
                <FormattedMessage id="pages.deposit.title" defaultMessage="Refill your balance" />
            </StyledPageTitle>
            {pageContent}
        </StyledPage>
    );
}
export default DepositPage;
DepositPage.requiresAuth = true;

const currentBalance = defineMessage({
    id: 'user.currentBalance',
    defaultMessage: 'Current Balance',
});
const CurrentBalance = observer(() => {
    const intl = useIntl();
    const userStore = useUserStore();

    return <DisplayDeposit label={intl.formatMessage(currentBalance)} getValue={() => userStore.currentUser.deposit} />;
});

const SellerFallback = () => {
    return (
        <StyledPageDescription>
            <FormattedMessage
                id="page.deposit.seller-fallback-message"
                defaultMessage="This page is only visible to users with the <b>Customer</b> role. Change your role on the <aLink>Profile</aLink> page"
                values={{
                    b: (chunks: string[]) => <b>{chunks}</b>,
                    aLink: (text: string) => <Link href="/profile">{text[0]}</Link>,
                }}
            />
        </StyledPageDescription>
    );
};
