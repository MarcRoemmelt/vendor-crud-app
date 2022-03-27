import { useModal } from '@mr/shared/ui/use-modal';
import { useEffect } from 'react';

import { useAuthStore } from '../AuthProvider';
import { MultiSessionWarning } from './MultiSessionWarning';

export const useMultiSessionWarning = () => {
    const authStore = useAuthStore();
    const { present } = useModal({ component: MultiSessionWarning, key: MultiSessionWarning.key });

    useEffect(() => {
        if (authStore.existingSessions) present();
    }, [authStore, present]);
};
