import { useContext } from 'react';
import { ModalStateContext } from './modal-provider';

export function useModalState() {
    const modalState = useContext(ModalStateContext);
    if (typeof modalState === 'undefined') {
        throw new Error('useModalState must be used within a ModalProvider');
    }
    return modalState;
}
