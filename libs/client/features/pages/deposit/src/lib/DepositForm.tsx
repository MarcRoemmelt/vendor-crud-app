import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { Field, FieldProps, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { toast } from 'react-toastify';

import { IcButton } from '@mr/client/ui/ic-button';
import { DisplayDeposit, Spinner } from '@mr/client/ui/small-components';
import { Coins } from '@mr/client/data-access/user-store';
import { useUserStore } from '@mr/client/features/user';

const StyledForm = styled(Form)`
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
type FormValues = Coins;
const initialState: Coins = { '5': 0, '10': 0, '20': 0, '50': 0, '100': 0 };
// eslint-disable-next-line max-lines-per-function
export const DepositForm = observer(() => {
    const [isLoading, setIsLoading] = useState(false);
    const userStore = useUserStore();
    const intl = useIntl();

    const onSubmit = useCallback(
        async (values: FormValues, actions: FormikHelpers<FormValues>) => {
            setIsLoading(true);
            await userStore.deposit(values);
            setIsLoading(false);
            actions.resetForm();
            toast(
                intl.formatMessage({
                    id: 'toasts.deposit-successful',
                    defaultMessage: 'Deposit successful!',
                }),
            );
        },
        [intl, userStore],
    );

    return (
        <Formik initialValues={initialState} onSubmit={onSubmit}>
            <StyledForm>
                <ResetForm />
                <CoinInputs />
                <SummaryAndSubmit isLoading={isLoading} />
            </StyledForm>
        </Formik>
    );
});

const StyledAmountButton = styled(IcButton)`
    margin: 4px;
    width: 100%;
`;
const MinusButton = ({ form: { setFieldValue, values }, field: { name } }: FieldProps<FormValues>) => {
    // eslint-disable-next-line security/detect-object-injection
    const onPress = () => setFieldValue(name, Math.max(0, values[name] - 1));
    return (
        <StyledAmountButton onPress={onPress as any} type="button" aria-label="Remove one">
            -
        </StyledAmountButton>
    );
};
const PlusButton = observer(({ form: { setFieldValue, values }, field: { name } }: FieldProps<FormValues>) => {
    // eslint-disable-next-line security/detect-object-injection
    const onPress = () => setFieldValue(name, values[name] + 1);
    return (
        <StyledAmountButton onPress={onPress as any} type="button" aria-label="Add one">
            +
        </StyledAmountButton>
    );
});

const StyledAmount = styled.div`
    display: inline-block;
    padding: 0.4em 0.3em 0.3em;
    font-weight: 800;
`;
const StyledCoinInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    margin: 12px;
`;
const StyledLabel = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    font-size: 1.1em;
    color: ${({ theme }) => theme.primaryColorContrast};
    background-color: ${({ theme }) => theme.primaryColor};
`;
const CoinInput = observer(({ name }: { name: keyof Coins }) => {
    const { values } = useFormikContext<Coins>();
    // eslint-disable-next-line security/detect-object-injection
    const amount = values[name];
    return (
        <StyledCoinInput>
            <StyledLabel>{name}</StyledLabel>
            <StyledAmount>{amount}</StyledAmount>
            <Field component={PlusButton} name={name} />
            <Field component={MinusButton} name={name} />
        </StyledCoinInput>
    );
});

const StyledCoinInputs = styled.div`
    display: flex;
`;
const CoinInputs = observer(() => {
    return (
        <StyledCoinInputs>
            <CoinInput name={5} />
            <CoinInput name={10} />
            <CoinInput name={20} />
            <CoinInput name={50} />
            <CoinInput name={100} />
        </StyledCoinInputs>
    );
});

const StyledSummaryAndSubmit = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px;

    font-weight: bold;
`;
const SummaryAndSubmit = ({ isLoading }: { isLoading: boolean }) => {
    return (
        <StyledSummaryAndSubmit>
            <NewBalance />
            <IcButton primary type="submit">
                {isLoading ? (
                    <Spinner size="30px" />
                ) : (
                    <FormattedMessage id="page.deposit.form.submit" defaultMessage="deposit" />
                )}
            </IcButton>
        </StyledSummaryAndSubmit>
    );
};

const newBalance = defineMessage({
    id: 'user.newBalance',
    defaultMessage: 'New Balance',
});
const NewBalance = observer(() => {
    const intl = useIntl();
    const { values } = useFormikContext<Coins>();
    return <DisplayDeposit label={intl.formatMessage(newBalance)} getValue={() => values} />;
});

const ResetForm = () => {
    const { resetForm } = useFormikContext<Coins>();
    return (
        <IcButton primary onPress={() => resetForm()}>
            <FormattedMessage id="page.deposit.form.reset" defaultMessage="reset form" />
        </IcButton>
    );
};
