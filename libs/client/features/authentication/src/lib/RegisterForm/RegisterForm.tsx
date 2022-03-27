import { observer } from 'mobx-react-lite';
import { Formik, Field } from 'formik';
import { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { IRegisterFormValues } from '@mr/client/data-access/auth-store';
import { IcButton } from '@mr/client/ui/ic-button';
import { Role } from '@mr/client/data-access/user-api';
import { StyledFieldset, StyledForm } from '@mr/shared/ui/form';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';

import { useAuthStore } from '../AuthProvider';
import { LoginForm } from '../LoginForm/LoginForm';

interface IRegisterFormProps extends ModalComponentProps {
    role: Role;
}
type FormValues = Omit<IRegisterFormValues, 'role'>;
const initialValues = { username: '', password: '' };

export const RegisterForm = observer(({ role }: IRegisterFormProps) => {
    const authStore = useAuthStore();

    const onSubmit = useCallback(
        async (values: FormValues) => {
            await authStore.register({ ...values, role });
            authStore.setActiveModal();
        },
        [authStore, role],
    );

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <StyledForm>
                <UsernameInput />
                <PasswordInput />
                <FormActions />
            </StyledForm>
        </Formik>
    );
});

const UsernameInput = observer(() => {
    return (
        <StyledFieldset>
            <label htmlFor="username">
                <FormattedMessage id="auth.register.form.labels.username" defaultMessage="Username" />
            </label>
            <Field id="username" name="username" autoComplete="username" placeholder="@MisterBanana" />
        </StyledFieldset>
    );
});

const PasswordInput = observer(() => {
    return (
        <StyledFieldset>
            <label htmlFor="password">
                <FormattedMessage id="auth.register.form.labels.password" defaultMessage="Password" />
            </label>
            <Field id="password" name="password" autoComplete="password" placeholder="abXen2/3nw" />
        </StyledFieldset>
    );
});

const StyledFormActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

function FormActions() {
    const store = useAuthStore();
    const showLogin = () => {
        store.setActiveModal(LoginForm.key);
    };
    return (
        <StyledFormActions>
            <IcButton secondary onPress={showLogin}>
                <FormattedMessage id="auth.register.form.cancel-button" defaultMessage="Already registered?" />
            </IcButton>
            <IcButton primary type="submit">
                <FormattedMessage id="auth.register.form.submit-button" defaultMessage="Register" />
            </IcButton>
        </StyledFormActions>
    );
}
