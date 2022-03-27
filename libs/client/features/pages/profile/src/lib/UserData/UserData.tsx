import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { defineMessages, useIntl } from 'react-intl';

import { useUserStore } from '@mr/client/features/user';
import { DisplayString, DisplayDeposit } from '@mr/client/ui/small-components';
import { Role } from '@mr/client/data-access/user-store';

const StyledUserData = styled.div`
    font-size: 1.4em;
`;

const { username, role, deposit } = defineMessages({
    username: { id: 'user.username', defaultMessage: 'Username' },
    role: { id: 'user.role', defaultMessage: 'Role' },
    deposit: { id: 'user.deposit', defaultMessage: 'Balance' },
});
export const UserData = observer(() => {
    const intl = useIntl();
    const userStore = useUserStore();
    const user = userStore.currentUser;

    return (
        <StyledUserData>
            <DisplayString label={intl.formatMessage(username)} getValue={() => user.username} />
            <DisplayString label={intl.formatMessage(role)} getValue={() => intl.formatMessage(roles[user.role])} />
            <DisplayDeposit label={intl.formatMessage(deposit)} getValue={() => user.deposit} />
        </StyledUserData>
    );
});

const roles = defineMessages({
    [Role.Buyer]: { id: 'role.buyer', defaultMessage: 'Customer' },
    [Role.Seller]: { id: 'role.seller', defaultMessage: 'Vendor' },
    [Role.Admin]: { id: 'role.admin', defaultMessage: 'Admin' },
});
