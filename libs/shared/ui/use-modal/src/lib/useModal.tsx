import { useContext, useMemo, useCallback } from 'react';
import { ModalComponentProps, ModalProvider, ModalUpdateContext } from './modal-provider';

const generateModalKey = (() => {
    let count = 0;

    return () => `${++count}`;
})();

export function useModal(
    component: React.ComponentType<ModalComponentProps>,
    data: Record<string, any> = {},
    onClose?: () => void,
) {
    const context = useContext(ModalUpdateContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider.');
    }
    const key = useMemo(generateModalKey, []);

    const showModal = useCallback(
        (modalData?: Record<string, any>) =>
            context.present(key, component, modalData instanceof Event ? data : { ...data, ...modalData }),
        [context, key, component, data],
    );
    const hideModal = useCallback(() => context.dismiss(key, onClose), [context, key, onClose]);

    return [showModal, hideModal];
}

useModal.ModalContext = ModalUpdateContext;
useModal.ModalProvider = ModalProvider;

export default useModal;
