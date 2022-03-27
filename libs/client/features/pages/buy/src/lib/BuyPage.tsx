import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { defineMessage, FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react-lite';

import { StyledPage } from '@mr/client/ui/small-components';
import { Header, HeaderLinkProps } from '@mr/shared/ui/header';
import { StyledPageDescription, StyledPageTitle } from '@mr/shared/ui/text';
import { ProductList } from '@mr/client/ui/product-list';
import { useUserStore } from '@mr/client/features/user';
import { Role } from '@mr/client/data-access/user-store';
import { useProductsStore } from '@mr/client/features/products';

import { BuyProductListItem } from './BuyProductListItem';

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

const SellerFallback = () => {
    return (
        <StyledPageDescription>
            <FormattedMessage
                id="page.buy.seller-fallback-message"
                defaultMessage="This page is only visible to users with the <b>Customer</b> role. Change your role on the <aLink>Profile</aLink> page"
                values={{
                    b: (chunks: string[]) => <b>{chunks}</b>,
                    aLink: (text: string) => <Link href="/profile">{text[0]}</Link>,
                }}
            />
        </StyledPageDescription>
    );
};

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
const _BuyPage = () => {
    const userStore = useUserStore();
    const productsStore = useProductsStore();
    const products = productsStore.getProductsForUser(userStore.currentUser._id);
    const userRole = userStore.currentUser.role;

    useEffect(() => {
        productsStore.fetchProducts();
    }, [productsStore]);

    const pageContent = useMemo(() => {
        switch (userRole) {
            case Role.Admin:
            case Role.Buyer:
                return <ProductList products={products} columns={columns} listItemComponent={BuyProductListItem} />;
            case Role.Seller:
                return <SellerFallback />;
            default:
                return null;
        }
    }, [products, userRole]);

    return (
        <StyledPage>
            <Header links={links} />
            <StyledPageTitle>
                <FormattedMessage id="pages.buy.title" defaultMessage="Shop to your hearts content" />
            </StyledPageTitle>
            {pageContent}
        </StyledPage>
    );
};
_BuyPage.requiresAuth = true;
export const BuyPage = observer(_BuyPage);

export default BuyPage;
