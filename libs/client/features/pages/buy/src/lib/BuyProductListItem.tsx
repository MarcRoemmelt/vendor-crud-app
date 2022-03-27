import { Field, FieldProps, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Fragment, useCallback, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Row, TableRowProps } from 'react-table';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { IProduct } from '@mr/client/data-access/products-store';
import { useProductsStore } from '@mr/client/features/products';
import { IcButton } from '@mr/client/ui/ic-button';
import { Spinner } from '@mr/client/ui/small-components';

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
export const BuyProductListItem = observer(({ values }: Row<Record<string, any>> & TableRowProps) => {
    const intl = useIntl();

    return (
        <StyledProductListItem>
            <StyledTitle>{values['productName']}</StyledTitle>
            <DisplayName label={intl.formatMessage(amount)} getValue={() => values['amountAvailable']} />
            <DisplayName label={intl.formatMessage(cost)} getValue={() => values['cost']} />
            <BuySection product={values as IProduct} />
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

const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
`;
interface FormValues {
    amount: number;
}
// eslint-disable-next-line max-lines-per-function
const BuySection = observer(({ product }: { product: IProduct }) => {
    const [isLoading, setIsLoading] = useState(false);
    const productsStore = useProductsStore();
    const intl = useIntl();

    const onSubmit = useCallback(
        async (values: FormValues) => {
            if (values.amount <= 0) return;
            setIsLoading(true);
            await productsStore.buy(product._id, values.amount);
            setIsLoading(false);
            toast(
                intl.formatMessage({
                    id: 'toasts.purchase-successful',
                    defaultMessage: 'Purchase successful!',
                }),
            );
        },
        [intl, product._id, productsStore],
    );

    return (
        <Formik initialValues={{ amount: 0 }} onSubmit={onSubmit}>
            {(props) => (
                <StyledForm onSubmit={props.handleSubmit} onReset={props.handleReset}>
                    <AmountInput amount={props.values.amount} product={product} />
                    <IcButton primary type="submit">
                        {isLoading ? (
                            <Spinner size="20px" />
                        ) : (
                            <FormattedMessage id="page.products.product-list-item.buy" defaultMessage="buy" />
                        )}
                    </IcButton>
                </StyledForm>
            )}
        </Formik>
    );
});

const StyledAmountButton = styled(IcButton)``;
const MinusButton = ({
    form: {
        setFieldValue,
        values: { amount },
    },
}: FieldProps<FormValues>) => {
    const onPress = () => setFieldValue('amount', Math.max(0, amount - 1));
    return (
        <StyledAmountButton onPress={onPress as any} type="button" aria-label="Remove one">
            -
        </StyledAmountButton>
    );
};
const PlusButton = observer(
    ({
        product,
        form: {
            setFieldValue,
            values: { amount },
        },
    }: FieldProps<FormValues> & { product: IProduct }) => {
        const onPress = () => setFieldValue('amount', Math.min(product.amountAvailable, amount + 1));
        return (
            <StyledAmountButton onPress={onPress as any} type="button" aria-label="Add one">
                +
            </StyledAmountButton>
        );
    },
);

const StyledAmount = styled.div`
    display: inline-block;
    padding: 0 0.3em;
    font-weight: 800;
`;
const AmountInput = observer(({ product, amount }: { amount: number; product: IProduct }) => {
    return (
        <Fragment>
            <Field component={MinusButton} name="amount" />
            <StyledAmount>{amount}</StyledAmount>
            <Field component={PlusButton} product={product} name="amount" />
        </Fragment>
    );
});
