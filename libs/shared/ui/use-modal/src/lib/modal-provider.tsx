import React, { ReactNode, useState, useMemo, useCallback } from 'react';
import { OverlayProvider, OverlayProps } from '@react-aria/overlays';

import { ModalDisplay } from './modal-display';

interface ModalProviderProps {
    children: ReactNode;
}

export interface ModalComponentProps {
    onClose: () => void;
    isOpen: boolean;
}

type Present = (
    modalKey: string,
    component: React.ComponentType<ModalComponentProps>,
    data: Record<string, any>,
) => void;

type Dismiss = (modalKey: string, onClose?: () => void | Promise<void>) => void;

export interface ModalConfig {
    isOpen: boolean;
    data: Record<string, any> & OverlayProps;
    component: React.ComponentType<ModalComponentProps>;
    dismiss: Dismiss;
    present: Present;
}
type ModalState = {
    [key: string]: ModalConfig;
};

type UseModal = {
    isOpen: boolean;
    dismiss: Dismiss;
    present: Present;
};

export const ModalStateContext = React.createContext<ModalState | undefined>(undefined);
export const ModalUpdateContext = React.createContext<UseModal | undefined>(undefined);

// eslint-disable-next-line max-lines-per-function
export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [state, setState] = useState<ModalState>({});

    const dismiss = useCallback((modalKey: string, onClose?: () => void | Promise<void>) => {
        setState((prev) => ({
            ...prev,
            // eslint-disable-next-line security/detect-object-injection
            [modalKey]: { ...prev[modalKey], isOpen: false },
        }));

        if (onClose) onClose();
    }, []);

    const present = useCallback(
        (modalKey, component: React.ComponentType<ModalComponentProps>, data: Record<string, any>) => {
            setState((prev) => ({
                ...prev,
                // eslint-disable-next-line security/detect-object-injection
                [modalKey]: { ...prev[modalKey], component, data, isOpen: true, dismiss },
            }));
        },
        [dismiss],
    );

    const contextValue = useMemo(
        () => ({
            dismiss,
            present,
            isOpen: Object.values(state).some(({ isOpen }) => isOpen),
        }),
        [dismiss, present, state],
    );

    return (
        <ModalStateContext.Provider value={state}>
            <ModalUpdateContext.Provider value={contextValue}>
                <OverlayProvider>
                    {children}
                    <ModalDisplay />
                </OverlayProvider>
            </ModalUpdateContext.Provider>
        </ModalStateContext.Provider>
    );
};

export default ModalProvider;
