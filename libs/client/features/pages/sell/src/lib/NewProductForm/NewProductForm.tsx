import { Formik, Field } from 'formik';
import { Fragment, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { INewProductFormValues } from '@mr/client/data-access/products-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';
import { StyledSectionTitle } from '@mr/shared/ui/text';

import { useProductsStore } from '@mr/client/features/products';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';
import { Spinner } from '@mr/client/ui/small-components';

type FormValues = INewProductFormValues;

// eslint-disable-next-line max-lines-per-function
export function NewProductForm({ state }: ModalComponentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const productStore = useProductsStore();
    const intl = useIntl();

    const onSubmit = useCallback(
        async (values: FormValues) => {
            setIsLoading(true);
            await productStore.createProduct({ ...values });
            setIsLoading(false);
            state.close();
            toast(
                intl.formatMessage({
                    id: 'toasts.product-create-successful',
                    defaultMessage: 'Product created!',
                }),
            );
        },
        [productStore, state, intl],
    );

    return (
        <Fragment>
            <StyledSectionTitle>
                <FormattedMessage id="new-product.form.title" defaultMessage="List a new product" />
            </StyledSectionTitle>
            <Formik initialValues={{ productName: '', amountAvailable: 0, cost: 0 }} onSubmit={onSubmit}>
                <StyledForm>
                    <ProductnameInput />
                    <AmountInput />
                    <CostInput />
                    <FormActions close={state.close} isLoading={isLoading} />
                </StyledForm>
            </Formik>
        </Fragment>
    );
}
NewProductForm.key = 'new-product-form';
export default NewProductForm;

function ProductnameInput() {
    return (
        <StyledFieldset>
            <label htmlFor="productName">
                <FormattedMessage id="new-product.form.labels.productname" defaultMessage="Productname" />
            </label>
            <Field id="productName" name="productName" placeholder="Productname" />
        </StyledFieldset>
    );
}

function AmountInput() {
    return (
        <StyledFieldset>
            <label htmlFor="amountAvailable">
                <FormattedMessage id="new-product.form.labels.amount" defaultMessage="Amount in Stock" />
            </label>
            <Field id="amountAvailable" name="amountAvailable" type="number" />
        </StyledFieldset>
    );
}
function CostInput() {
    return (
        <StyledFieldset>
            <label htmlFor="cost">
                <FormattedMessage id="new-product.form.labels.cost" defaultMessage="Cost of one unit" />
            </label>
            <Field id="cost" name="cost" type="number" />
        </StyledFieldset>
    );
}

const StyledFormActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

function FormActions({ close, isLoading }: { isLoading: boolean; close: () => void }) {
    return (
        <StyledFormActions>
            <IcButton secondary onPress={close}>
                <FormattedMessage id="new-product.form.cancel-button" defaultMessage="cancel" />
            </IcButton>
            <IcButton primary type="submit">
                {isLoading ? (
                    <Spinner size="30px" />
                ) : (
                    <FormattedMessage id="new-product.form.submit-button" defaultMessage="create" />
                )}
            </IcButton>
        </StyledFormActions>
    );
}
