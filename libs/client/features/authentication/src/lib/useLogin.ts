import { useModal } from '@mr/shared/ui/use-modal';

import { LoginForm } from './LoginForm/LoginForm';

export function useLogin() {
    const [present, dismiss] = useModal(LoginForm);

    return {
        present,
        dismiss,
    };
}
