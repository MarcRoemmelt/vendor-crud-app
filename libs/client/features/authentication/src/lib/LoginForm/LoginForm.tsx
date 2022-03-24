import { Formik, Field } from 'formik';
import { ChangeEvent, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ILoginFormValues } from '@mr/client/data-access/auth-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { StyledPageTitle } from '@mr/shared/ui/text';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';

import { useAuthStore } from '../AuthProvider';
import { useCustomerRegister } from '../useCustomerRegister';

interface ILoginFormProps {
    onClose: () => void;
}
type FormValues = Omit<ILoginFormValues, 'role'>;
const initialValues = { username: '', password: '' };

// eslint-disable-next-line max-lines-per-function
export function LoginForm({ onClose }: ILoginFormProps) {
    const authStore = useAuthStore();
    const { present } = useCustomerRegister();

    const goToRegister = () => {
        onClose();
        present();
    };

    const onSubmit = useCallback(
        (values: FormValues) => {
            authStore.login({ ...values });
        },
        [authStore],
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
                    <FormActions goToRegister={goToRegister} />
                </StyledForm>
            </Formik>
        </div>
    );
}

function UsernameInput() {
    const authStore = useAuthStore();
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => authStore.setUsername(e.target.value);

    return (
        <StyledFieldset>
            <label htmlFor="username">
                <FormattedMessage id="auth.Login.form.labels.username" defaultMessage="Username" />
            </label>
            <Field
                id="username"
                name="username"
                placeholder="@MisterBanana"
                autocomplete="username"
                value={authStore.values.username}
                onChange={handleUsernameChange}
            />
        </StyledFieldset>
    );
}

function PasswordInput() {
    const authStore = useAuthStore();
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => authStore.setPassword(e.target.value);

    return (
        <StyledFieldset>
            <label htmlFor="password">
                <FormattedMessage id="auth.Login.form.labels.password" defaultMessage="Password" />
            </label>
            <Field
                id="password"
                name="password"
                autocomplete="new-password"
                placeholder="abXen2/3nw"
                value={authStore.values.password}
                onChange={handlePasswordChange}
            />
        </StyledFieldset>
    );
}

const StyledFormActions = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface IFormActionsProps {
    goToRegister: () => void;
}
function FormActions({ goToRegister }: IFormActionsProps) {
    return (
        <StyledFormActions>
            <IcButton secondary onClick={goToRegister}>
                <FormattedMessage id="auth.login.form.cancel-button" defaultMessage="No account yet?" />
            </IcButton>
            <IcButton primary type="submit">
                <FormattedMessage id="auth.login.form.submit-button" defaultMessage="Login" />
            </IcButton>
        </StyledFormActions>
    );
}
