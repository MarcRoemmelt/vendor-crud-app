import React, { ReactNode, useState, useCallback, HTMLAttributes } from 'react';
import { OverlayProvider } from '@react-aria/overlays';
import { OverlayTriggerState } from '@react-stately/overlays';

import { ModalDisplay } from './modal-display';

interface ModalProviderProps {
    children: ReactNode;
}
type Props<P> = { [key in keyof P]: P[key] };
export type ModalComponentProps<P extends Record<string, any> = Record<string, any>> = {
    state: OverlayTriggerState;
    titleProps: HTMLAttributes<HTMLElement>;
} & Props<P>;

export type UpdateModals<P extends Record<string, any> = Record<string, any>> = (
    key: string,
    component: React.ComponentType<ModalComponentProps<P>>,
    data: P,
    state: ModalComponentProps['state'],
) => void;

export type ModalConfig<P = Record<string, any>> = {
    key: string;
    data: Record<string, any> & { state: OverlayTriggerState };
    component: React.ComponentType<ModalComponentProps<P>>;
};
export type ModalState = { [key: string]: ModalConfig };
export const ModalStateContext = React.createContext<ModalState | undefined>(undefined);
export const ModalUpdateContext = React.createContext<UpdateModals | undefined>(undefined);

// eslint-disable-next-line max-lines-per-function
export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [state, setState] = useState<ModalState>({});

    const updateModals: UpdateModals = useCallback((key, component, data, state) => {
        setState((prev) => ({ ...prev, [key]: { key, component, data: { ...data, state } } }));
    }, []);

    return (
        <ModalStateContext.Provider value={state}>
            <ModalUpdateContext.Provider value={updateModals}>
                <OverlayProvider>
                    {children}
                    <ModalDisplay />
                </OverlayProvider>
            </ModalUpdateContext.Provider>
        </ModalStateContext.Provider>
    );
};

export default ModalProvider;
