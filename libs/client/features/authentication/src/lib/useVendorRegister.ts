import { useModal } from '@mr/shared/ui/use-modal';
import { VendorRegister } from './VendorRegister';

export function useVendorRegister() {
    const [present, dismiss] = useModal(VendorRegister);

    return {
        present,
        dismiss,
    };
}
