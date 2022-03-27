import { Formik, Field } from 'formik';
import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { IManageProfileFormValues, Role } from '@mr/client/data-access/user-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';
import { useUserStore } from '@mr/client/features/user';
import { StyledSectionTitle } from '@mr/shared/ui/text';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';
import { Spinner } from '@mr/client/ui/small-components';

type FormValues = IManageProfileFormValues;

// eslint-disable-next-line max-lines-per-function
const _ManageProfileForm = ({ state }: ModalComponentProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const userStore = useUserStore();
    const intl = useIntl();

    const onSubmit = useCallback(
        async (values: FormValues) => {
            setIsLoading(true);
            await userStore.updateUser({ ...values });
            setIsLoading(false);
            state.close();
            toast(
                intl.formatMessage({
                    id: 'toasts.user-update-successful',
                    defaultMessage: 'Update successful!',
                }),
            );
        },
        [userStore, state, intl],
    );

    return (
        <Formik
            initialValues={{ username: userStore.currentUser.username, role: userStore.currentUser.role }}
            onSubmit={onSubmit}
        >
            <StyledForm>
                <StyledSectionTitle>
                    <FormattedMessage id="edit-profile.form.title" defaultMessage="Edit your profile" />
                </StyledSectionTitle>
                <UsernameInput />
                <RoleInput />
                <FormActions state={state} isLoading={isLoading} />
            </StyledForm>
        </Formik>
    );
};
_ManageProfileForm.key = 'manage-profile-form';
export const ManageProfileForm = observer(_ManageProfileForm);
export default ManageProfileForm;

function UsernameInput() {
    return (
        <StyledFieldset>
            <label htmlFor="username">
                <FormattedMessage id="new-product.form.labels.productname" defaultMessage="Username" />
            </label>
            <Field id="username" name="username" placeholder="Username" />
        </StyledFieldset>
    );
}

function RoleInput() {
    const intl = useIntl();
    const customer = intl.formatMessage({ id: 'role.buyer', defaultMessage: 'Customer' });
    const vendor = intl.formatMessage({ id: 'role.seller', defaultMessage: 'Vendor' });

    return (
        <StyledFieldset>
            <label htmlFor="role">
                <FormattedMessage id="manage-profile.form.labels.role" defaultMessage="Your account type" />
            </label>
            <Field id="role" name="role" as="select">
                <option value={Role.Buyer}>{customer}</option>
                <option value={Role.Seller}>{vendor}</option>
            </Field>
        </StyledFieldset>
    );
}

const StyledFormActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

// eslint-disable-next-line max-lines-per-function
function FormActions({ state, isLoading }: { isLoading: boolean; state: ModalComponentProps['state'] }) {
    const [isLoadingReset, setIsLoading] = useState(false);
    const userStore = useUserStore();
    const intl = useIntl();

    const resetDespost = useCallback(async () => {
        setIsLoading(true);
        await userStore.resetBalance();
        setIsLoading(false);
        toast(
            intl.formatMessage({
                id: 'toasts.deposit-reset-successful',
                defaultMessage: 'Deposit reset successful!',
            }),
        );
    }, [userStore, intl]);

    return (
        <StyledFormActions>
            <IcButton secondary onPress={state.close} type="button">
                <FormattedMessage id="manage-profile.form.cancel-button" defaultMessage="cancel" />
            </IcButton>
            <IcButton secondary onPress={resetDespost} type="button">
                {isLoadingReset ? (
                    <Spinner size="20px" />
                ) : (
                    <FormattedMessage id="manage-profile.form.reset-balance-button" defaultMessage="Reset balance" />
                )}
            </IcButton>
            <IcButton primary type="submit">
                {isLoading ? (
                    <Spinner size="20px" />
                ) : (
                    <FormattedMessage id="manage-profile.form.submit-button" defaultMessage="save" />
                )}
            </IcButton>
        </StyledFormActions>
    );
}
