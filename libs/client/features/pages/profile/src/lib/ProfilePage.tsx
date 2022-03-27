import styled from 'styled-components';
import { defineMessage, FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { StyledPage } from '@mr/client/ui/small-components';
import { Header, HeaderLinkProps } from '@mr/shared/ui/header';
import { StyledPageTitle } from '@mr/shared/ui/text';
import { IcButton } from '@mr/client/ui/ic-button';
import { useAuthStore } from '@mr/client/features/authentication';
import { useModal } from '@mr/shared/ui/use-modal';
import { useUserStore } from '@mr/client/features/user';

import { UserData } from './UserData/UserData';
import ManageProfileForm from './ManageProfileForm/ManageProfileForm';

const links: HeaderLinkProps[] = [
    {
        name: defineMessage({ id: 'nav.link.buy', defaultMessage: 'Buy' }),
        href: '/buy',
        icon: 'B',
    },
    {
        name: defineMessage({ id: 'nav.link.deposit', defaultMessage: 'Deposit' }),
        href: '/deposit',
        icon: 'D',
    },
    {
        name: defineMessage({ id: 'nav.link.sell', defaultMessage: 'Sell' }),
        href: '/sell',
        icon: 'S',
    },
    {
        name: defineMessage({ id: 'nav.link.profile', defaultMessage: 'Profile' }),
        href: '/profile',
        icon: 'P',
    },
];

export function ProfilePage() {
    return (
        <StyledPage>
            <Header links={links} />
            <StyledPageTitle>
                <FormattedMessage id="pages.profile.title" defaultMessage="Manage your Profile" />
            </StyledPageTitle>
            <UserData />
            <Buttons />
        </StyledPage>
    );
}
ProfilePage.requiresAuth = true;

const StyledButtons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const StyledButton = styled(IcButton)`
    margin-bottom: 10px;
`;
const StyledDelete = styled(IcButton)`
    margin-top: 80px;
    background-color: #c20303;
    border-color: #c20303;
    color: white;
`;

const Buttons = () => {
    const { present: editProfile } = useModal({ component: ManageProfileForm, key: ManageProfileForm.key });
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const intl = useIntl();

    const logout = async () => {
        await authStore.logout();
    };

    const deleteAccount = async () => {
        await userStore.deleteUser();
        await logout();
        toast(intl.formatMessage({ id: 'toast.account-delete-successful', defaultMessage: 'Account deleted.' }));
    };

    return (
        <StyledButtons>
            <StyledButton onPress={editProfile}>
                <FormattedMessage id="pages.profile.buttons.edit" defaultMessage="Edit Profile" />
            </StyledButton>
            <IcButton onPress={logout}>
                <FormattedMessage id="pages.profile.buttons.logout" defaultMessage="Logout" />
            </IcButton>
            <StyledDelete onPress={deleteAccount}>
                <FormattedMessage id="pages.profile.buttons.delete" defaultMessage="Delete Account" />
            </StyledDelete>
        </StyledButtons>
    );
};
export default ProfilePage;
