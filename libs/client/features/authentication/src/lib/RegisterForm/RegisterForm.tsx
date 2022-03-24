import { Formik, Field } from 'formik';
import { ChangeEvent, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { IRegisterFormValues } from '@mr/client/data-access/auth-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { Role } from '@mr/client/data-access/user-api';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';

import { useAuthStore } from '../AuthProvider';

interface IRegisterFormProps {
    role: Role;
    goToLogin: () => void;
}
type FormValues = Omit<IRegisterFormValues, 'role'>;
const initialValues = { username: '', password: '' };

export function RegisterForm({ goToLogin, role }: IRegisterFormProps) {
    const authStore = useAuthStore();

    const onSubmit = useCallback(
        (values: FormValues) => {
            authStore.register({ ...values, role });
        },
        [authStore, role],
    );

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <StyledForm>
                <UsernameInput />
                <PasswordInput />
                <FormActions goToLogin={goToLogin} />
            </StyledForm>
        </Formik>
    );
}

function UsernameInput() {
    const authStore = useAuthStore();
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => authStore.setUsername(e.target.value);

    return (
        <StyledFieldset>
            <label htmlFor="username">
                <FormattedMessage id="auth.register.form.labels.username" defaultMessage="Username" />
            </label>
            <Field
                id="username"
                name="username"
                autocomplete="username"
                placeholder="@MisterBanana"
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
                <FormattedMessage id="auth.register.form.labels.password" defaultMessage="Password" />
            </label>
            <Field
                id="password"
                name="password"
                autocomplete="password"
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
    margin-top: 20px;
`;

interface IFormActionsProps {
    goToLogin: () => void;
}
function FormActions({ goToLogin }: IFormActionsProps) {
    return (
        <StyledFormActions>
            <IcButton secondary onClick={goToLogin}>
                <FormattedMessage id="auth.register.form.cancel-button" defaultMessage="Already registered?" />
            </IcButton>
            <IcButton primary type="submit">
                <FormattedMessage id="auth.register.form.submit-button" defaultMessage="Register" />
            </IcButton>
        </StyledFormActions>
    );
}
