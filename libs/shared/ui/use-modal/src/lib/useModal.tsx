import { useOverlayTrigger } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';
import { useContext, useRef, useEffect } from 'react';

import { ModalComponentProps, ModalProvider, ModalUpdateContext, UpdateModals } from './modal-provider';

const generateModalKey = (() => {
    let count = 0;

    return () => `${++count}`;
})();

// eslint-disable-next-line max-lines-per-function
export function useModal<P extends Record<string, any>>({
    component,
    props,
    onChange,
    key = generateModalKey(),
}: {
    component: React.ComponentType<ModalComponentProps<P>>;
    props?: P;
    onChange?: (isOpen: boolean) => void;
    key: string;
}) {
    const updateModals = useContext(ModalUpdateContext) as UpdateModals;
    if (updateModals === undefined) {
        throw new Error('useModal must be used within a ModalProvider.');
    }

    const state = useOverlayTriggerState({ onOpenChange: onChange });

    // Get props for the trigger and overlay. This also handles
    // hiding the overlay when a parent element of the trigger scrolls
    // (which invalidates the popover positioning).
    const triggerRef = useRef(null);
    const { triggerProps, overlayProps } = useOverlayTrigger({ type: 'dialog' }, state, triggerRef);

    useEffect(() => {
        updateModals(key, component as any, { ...overlayProps, ...(props ?? {}) }, state);
    }, [key, updateModals, component, props, overlayProps, state]);

    return {
        state,
        present: state.open,
        dismiss: state.close,
        toggle: state.toggle,
        triggerProps: { ...triggerProps, ref: triggerRef },
    };
}

useModal.ModalContext = ModalUpdateContext;
useModal.ModalProvider = ModalProvider;

export default useModal;
