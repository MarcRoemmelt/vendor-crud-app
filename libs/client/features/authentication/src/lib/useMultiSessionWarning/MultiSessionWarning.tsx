import { observer } from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { IcButton } from '@mr/client/ui/ic-button';
import { StyledSectionTitle, StyledText } from '@mr/shared/ui/text';
import { ModalComponentProps } from '@mr/shared/ui/use-modal';

import { useAuthStore } from '../AuthProvider';

const StyledWrapper = styled.div`
    max-width: 500px;
    text-align: center;
`;

type IMultiSessionWarningProps = ModalComponentProps;
const _MultiSessionWarning = ({ state }: IMultiSessionWarningProps) => {
    const authStore = useAuthStore();

    return (
        <StyledWrapper>
            <StyledSectionTitle>
                <FormattedMessage
                    id="auth.modal.multiple-sessions-detected.title"
                    defaultMessage="Multiple sessions are active"
                />
            </StyledSectionTitle>
            <StyledText>
                <FormattedMessage
                    id="auth.modal.multiple-sessions-detected.description"
                    defaultMessage="There {numSessions, plural, =1 {is} other {are}} currently {numSessions} other {numSessions, plural, =1 {session} other {sessions}} active for your account. Do you want to end {numSessions, plural, =1 {it} other {them}}? (This won't log you out)"
                    values={{ numSessions: authStore.existingSessions }}
                />
            </StyledText>
            <Actions dismiss={state.close} />
        </StyledWrapper>
    );
};
_MultiSessionWarning.key = 'multi-session-warning';
export const MultiSessionWarning = observer(_MultiSessionWarning);

const StyledActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
`;
const Actions = observer(({ dismiss }: { dismiss: () => void }) => {
    const authStore = useAuthStore();
    const removeSessions = async () => {
        await authStore.logoutAll();
        dismiss();
    };
    return (
        <StyledActions>
            <IcButton onPress={dismiss}>
                <FormattedMessage id="auth.modal.multiple-sessions-detected.button.dismiss" defaultMessage="Dismiss" />
            </IcButton>
            <IcButton onPress={removeSessions}>
                <FormattedMessage
                    id="auth.modal.multiple-sessions-detected.button.remove-sessions"
                    defaultMessage="End all other sessions"
                />
            </IcButton>
        </StyledActions>
    );
});
