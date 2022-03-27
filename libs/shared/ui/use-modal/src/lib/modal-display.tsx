import { Fragment, useRef } from 'react';
import { OverlayContainer, useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { useDialog } from '@react-aria/dialog';

import { useModalState } from './useModalState';
import { ModalConfig } from './modal-provider';
import styled from 'styled-components';
import { mergeProps } from '@react-aria/utils';

const StyledUnderlay = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledModalContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;

    background: ${({ theme }) => theme.primaryColorContrast};
    color: ${({ theme }) => theme.primaryColor};
    padding: 30px;
    border-radius: ${({ theme }) => theme.borderRadiusModal};
    border-style: solid;
    border-width: 3px;
    border-color: ${({ theme }) => theme.primaryColor};
    box-shadow: ${({ theme }) => theme.boxShadowModal};
`;

// eslint-disable-next-line max-lines-per-function
function Modal({ component: Component, data }: ModalConfig) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const { overlayProps, underlayProps } = useOverlay(
        {
            isDismissable: true,
            isKeyboardDismissDisabled: false,
            isOpen: data.state.isOpen,
            onClose: data.state.close,
            ...data,
        },
        overlayRef,
    );

    // Hide content outside the modal from screen readers.
    const { modalProps } = useModal();

    // Get props for the dialog and its title
    const { dialogProps, titleProps } = useDialog({}, overlayRef);

    // Prevent scrolling while the modal is open, and hide content
    // outside the modal from screen readers.
    usePreventScroll();

    return data.state.isOpen ? (
        <OverlayContainer>
            <StyledUnderlay {...underlayProps}>
                <FocusScope contain restoreFocus autoFocus>
                    <StyledModalContainer {...mergeProps(overlayProps, modalProps, dialogProps)} ref={overlayRef}>
                        <Component {...data} titleProps={titleProps} />
                    </StyledModalContainer>
                </FocusScope>
            </StyledUnderlay>
        </OverlayContainer>
    ) : null;
}

export function ModalDisplay() {
    const modalState = useModalState();
    const modals = Object.entries(modalState).map(([_, modalConfig]) => <Modal {...modalConfig} />);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{modals}</Fragment>;
}
