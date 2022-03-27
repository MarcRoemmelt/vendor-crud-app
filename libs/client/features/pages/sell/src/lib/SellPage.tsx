import { Fragment, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { defineMessage, FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { StyledPage } from '@mr/client/ui/small-components';
import { IcButton } from '@mr/client/ui/ic-button';
import { Header, HeaderLinkProps } from '@mr/shared/ui/header';
import { StyledPageDescription, StyledPageTitle } from '@mr/shared/ui/text';
import { useModal } from '@mr/shared/ui/use-modal';
import { ProductList } from '@mr/client/ui/product-list';
import { useUserStore } from '@mr/client/features/user';
import { useProductsStore } from '@mr/client/features/products';
import { Role } from '@mr/client/data-access/user-store';

import { SellProductListItem } from './SellProductListItem';

const DynamicNewProductForm = dynamic(() => import('./NewProductForm/NewProductForm'));

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

const columns = [
    {
        accessor: '_id' as const,
    },
    {
        accessor: 'sellerId' as const,
    },
    {
        Header: 'Product Name',
        accessor: 'productName' as const,
    },
    {
        Header: 'Available Stock',
        accessor: 'amountAvailable' as const,
    },
    {
        Header: 'Price',
        accessor: 'cost' as const,
    },
];
// eslint-disable-next-line max-lines-per-function
const _SellPage = () => {
    const userStore = useUserStore();
    const productsStore = useProductsStore();
    const products = productsStore.products;
    const userRole = userStore.currentUser.role;

    useEffect(() => {
        productsStore.fetchBySellerId(userStore.currentUser._id);
    }, [productsStore, userStore.currentUser._id]);

    const pageContent = useMemo(() => {
        switch (userRole) {
            case Role.Admin:
            case Role.Seller:
                return (
                    <Fragment>
                        <NewProductButton />
                        <ProductList products={products} columns={columns} listItemComponent={SellProductListItem} />
                    </Fragment>
                );
            case Role.Buyer:
                return <BuyerFallback />;
            default:
                return null;
        }
    }, [products, userRole]);

    return (
        <StyledPage>
            <Header links={links} />
            <StyledPageTitle>
                <FormattedMessage id="pages.sell.title" defaultMessage="Manage your Products" />
            </StyledPageTitle>
            {pageContent}
        </StyledPage>
    );
};
_SellPage.requiresAuth = true;
export const SellPage = observer(_SellPage);
const BuyerFallback = () => {
    return (
        <StyledPageDescription>
            <FormattedMessage
                id="page.sell.buyer-fallback-message"
                defaultMessage="This page is only visible to users with the <b>Vendor</b> role. Change your role on the <aLink>Profile</aLink> page"
                values={{
                    b: (chunks: string[]) => <b>{chunks}</b>,
                    aLink: (text: string) => <Link href="/profile">{text[0]}</Link>,
                }}
            />
        </StyledPageDescription>
    );
};

const StyledNewProductButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 auto 20px auto;
`;

const NewProductButton = () => {
    const { present } = useModal({ component: DynamicNewProductForm, key: 'new-product-form' });

    return (
        <StyledNewProductButtonContainer>
            <IcButton primary onPress={present} size="xl">
                <FormattedMessage id="pages.sell.buttons.new-prodcut" defaultMessage="Add new product" />
            </IcButton>
        </StyledNewProductButtonContainer>
    );
};
export default SellPage;
