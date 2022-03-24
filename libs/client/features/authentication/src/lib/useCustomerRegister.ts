import { useModal } from '@mr/shared/ui/use-modal';
import { CustomerRegister } from './CustomerRegister';

export function useCustomerRegister() {
    const [present, dismiss] = useModal(CustomerRegister);

    return {
        present,
        dismiss,
    };
}
