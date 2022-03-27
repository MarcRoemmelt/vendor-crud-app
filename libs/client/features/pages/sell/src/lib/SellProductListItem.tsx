import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Row, TableRowProps } from 'react-table';
import styled from 'styled-components';

import { IProduct } from '@mr/client/data-access/products-store';
import { useProductsStore } from '@mr/client/features/products';
import { IcButton } from '@mr/client/ui/ic-button';
import { Spinner } from '@mr/client/ui/small-components';
import { useModal } from '@mr/shared/ui/use-modal';
import EditProductForm from './EditProductForm';

const StyledProductListItem = styled.li`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 16px;
    width: 250px;
    border-radius: ${({ theme }) => theme.borderRadiusCard};
    box-shadow: ${({ theme }) => theme.boxShadowCard};
`;

const { amount, cost } = defineMessages({
    productName: { id: 'product.name', defaultMessage: 'Product Name' },
    amount: { id: 'product.amount', defaultMessage: 'Available Stock' },
    cost: { id: 'product.cost', defaultMessage: 'Price per Unit' },
});
export const SellProductListItem = observer(({ values }: Row<Record<string, any>> & TableRowProps) => {
    const intl = useIntl();

    return (
        <StyledProductListItem>
            <StyledTitle>{values['productName']}</StyledTitle>
            <DisplayName label={intl.formatMessage(amount)} getValue={() => values['amountAvailable']} />
            <DisplayName label={intl.formatMessage(cost)} getValue={() => values['cost']} />
            <EditSection product={values as IProduct} />
        </StyledProductListItem>
    );
});
const StyledTitle = styled.h3``;

const StyledField = styled.div`
    display: flex;
    align-items: center;
`;
const StyledLabel = styled.div`
    font-weight: bold;

    width: 150px;
    margin-right: 12px;
`;

const StyledDisplayName = styled.div`
    padding: 0.2em 0;
`;

const DisplayName = observer(({ getValue, label }: { label?: string; getValue: () => number | string }) => {
    return (
        <StyledField>
            {label && <StyledLabel>{label}:</StyledLabel>}
            <StyledDisplayName>{getValue()}</StyledDisplayName>
        </StyledField>
    );
});

const StyledActions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
`;
// eslint-disable-next-line max-lines-per-function
const EditSection = observer(({ product }: { product: IProduct }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { present: editProduct } = useModal({
        component: EditProductForm,
        key: EditProductForm.key,
        props: { productId: product._id },
    });
    const productsStore = useProductsStore();

    const deleteProduct = useCallback(async () => {
        setIsLoading(true);
        await productsStore.deleteProduct(product._id);
        setIsLoading(false);
    }, [product._id, productsStore]);

    return (
        <StyledActions>
            <IcButton primary onPress={deleteProduct}>
                {isLoading ? (
                    <Spinner size="30px" />
                ) : (
                    <FormattedMessage id="page.sell.product-list-item.delete" defaultMessage="delete" />
                )}
            </IcButton>
            <IcButton primary onPress={editProduct}>
                <FormattedMessage id="page.sell.product-list-item.edit" defaultMessage="edit" />
            </IcButton>
        </StyledActions>
    );
});
