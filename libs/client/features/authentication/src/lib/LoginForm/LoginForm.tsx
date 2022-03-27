import { Formik, Field } from 'formik';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ILoginFormValues } from '@mr/client/data-access/auth-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { StyledPageTitle } from '@mr/shared/ui/text';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';

import { useAuthStore } from '../AuthProvider';
import { CustomerRegister } from '../CustomerRegister';
import { useRouter } from 'next/router';

type ILoginFormProps = ModalComponentProps;
type FormValues = Omit<ILoginFormValues, 'role'>;
const initialValues = { username: '', password: '' };

// eslint-disable-next-line max-lines-per-function
export function LoginForm(_: ILoginFormProps) {
    const authStore = useAuthStore();
    const {
        query: { returnUrl },
        push,
    } = useRouter();

    const onSubmit = useCallback(
        async (values: FormValues) => {
            await authStore.login({ ...values });
            authStore.setActiveModal();
            if (returnUrl && typeof returnUrl === 'string') push(returnUrl);
        },
        [authStore, push, returnUrl],
    );

    return (
        <div>
            <StyledPageTitle>
                <FormattedMessage id="auth.login.title" defaultMessage="Login" />
            </StyledPageTitle>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <StyledForm>
                    <UsernameInput />
                    <PasswordInput />
                    <FormActions />
                </StyledForm>
            </Formik>
        </div>
    );
}
LoginForm.key = 'login';

function UsernameInput() {
    return (
        <StyledFieldset>
            <label htmlFor="username">
                <FormattedMessage id="auth.Login.form.labels.username" defaultMessage="Username" />
            </label>
            <Field id="username" name="username" placeholder="@MisterBanana" autoComplete="username" />
        </StyledFieldset>
    );
}

function PasswordInput() {
    return (
        <StyledFieldset>
            <label htmlFor="password">
                <FormattedMessage id="auth.Login.form.labels.password" defaultMessage="Password" />
            </label>
            <Field id="password" name="password" autoComplete="new-password" placeholder="abXen2/3nw" />
        </StyledFieldset>
    );
}

const StyledFormActions = styled.div`
    display: flex;
    justify-content: space-between;
`;

function FormActions() {
    const store = useAuthStore();
    const showCustomRegister = () => {
        store.setActiveModal(CustomerRegister.key);
    };
    return (
        <StyledFormActions>
            <IcButton secondary onPress={showCustomRegister}>
                <FormattedMessage id="auth.login.form.cancel-button" defaultMessage="No account yet?" />
            </IcButton>
            <IcButton primary type="submit">
                <FormattedMessage id="auth.login.form.submit-button" defaultMessage="Login" />
            </IcButton>
        </StyledFormActions>
    );
}
