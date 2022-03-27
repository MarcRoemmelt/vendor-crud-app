import { Formik, Field } from 'formik';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { IUpdateProductFormValues } from '@mr/client/data-access/products-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';
import { StyledSectionTitle } from '@mr/shared/ui/text';
import { Spinner } from '@mr/client/ui/small-components';
import { useProductsStore } from '@mr/client/features/products';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';

type FormValues = IUpdateProductFormValues;
type IEditProductFormProps = ModalComponentProps<{ productId: string }>;

// eslint-disable-next-line max-lines-per-function
function _EditProductForm({ state, productId }: IEditProductFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const productStore = useProductsStore();
    const product = productStore.getProduct(productId);
    const intl = useIntl();

    const onSubmit = useCallback(
        async (values: FormValues) => {
            setIsLoading(true);
            await productStore.updateProduct(productId, { ...values });
            setIsLoading(false);
            state.close();
            toast(
                intl.formatMessage({
                    id: 'toasts.product-update-successful',
                    defaultMessage: 'Product updated!',
                }),
            );
        },
        [productStore, productId, state, intl],
    );

    const defaultValues = useMemo(
        () => ({
            productName: product?.productName ?? '',
            amountAvailable: product?.amountAvailable ?? 0,
            cost: product?.cost ?? 0,
        }),
        [product],
    );
    return (
        <Fragment>
            <StyledSectionTitle>
                <FormattedMessage id="edit-product.form.title" defaultMessage="Update product" />
            </StyledSectionTitle>
            <Formik initialValues={defaultValues} onSubmit={onSubmit}>
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
_EditProductForm.key = 'edit-product-form';
export const EditProductForm = observer(_EditProductForm);

function ProductnameInput() {
    return (
        <StyledFieldset>
            <label htmlFor="productName">
                <FormattedMessage id="edit-product.form.labels.productname" defaultMessage="Productname" />
            </label>
            <Field id="productName" name="productName" placeholder="Productname" />
        </StyledFieldset>
    );
}

function AmountInput() {
    return (
        <StyledFieldset>
            <label htmlFor="amountAvailable">
                <FormattedMessage id="edit-product.form.labels.amount" defaultMessage="Amount in Stock" />
            </label>
            <Field id="amountAvailable" name="amountAvailable" type="number" />
        </StyledFieldset>
    );
}
function CostInput() {
    return (
        <StyledFieldset>
            <label htmlFor="cost">
                <FormattedMessage id="edit-product.form.labels.cost" defaultMessage="Cost of one unit" />
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

function FormActions({ isLoading, close }: { isLoading: boolean; close: () => void }) {
    return (
        <StyledFormActions>
            <IcButton secondary onPress={close}>
                {isLoading ? (
                    <Spinner size="30px" />
                ) : (
                    <FormattedMessage id="edit-product.form.cancel-button" defaultMessage="cancel" />
                )}
            </IcButton>
            <IcButton primary type="submit">
                <FormattedMessage id="edit-product.form.submit-button" defaultMessage="save" />
            </IcButton>
        </StyledFormActions>
    );
}
