import { Fragment, useCallback, useRef } from 'react';
import { OverlayContainer, useModal, useOverlay, usePreventScroll } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';

import { useModalState } from './useModalState';
import { ModalConfig } from './modal-provider';
import styled from 'styled-components';

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

    background: ${({ theme }) => theme.primaryColorContrast};
    color: ${({ theme }) => theme.primaryColor};
    padding: 30px;
    border-radius: ${({ theme }) => theme.borderRadiusModal};
    border-style: solid;
    border-width: 3px;
    border-color: ${({ theme }) => theme.primaryColor};
    box-shadow: ${({ theme }) => theme.boxShadowModal};
`;

const StyledDismissBucket = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

// eslint-disable-next-line max-lines-per-function
function Modal({ component: Component, isOpen, data, dismiss, modalKey }: ModalConfig & { modalKey: string }) {
    const ref = useRef(null);
    const { overlayProps, underlayProps } = useOverlay(
        { isDismissable: true, isKeyboardDismissDisabled: true, ...data, isOpen },
        ref,
    );

    // Prevent scrolling while the modal is open, and hide content
    // outside the modal from screen readers.
    usePreventScroll();
    const { modalProps } = useModal();

    const handleDismiss = useCallback(() => {
        if (data.isDismissable === false) return;
        dismiss(modalKey);
    }, [data.isDismissable, dismiss, modalKey]);

    return isOpen ? (
        <OverlayContainer>
            <StyledUnderlay {...underlayProps}>
                <StyledDismissBucket onClick={handleDismiss} />
                <FocusScope contain restoreFocus autoFocus>
                    <StyledModalContainer {...overlayProps} {...modalProps} ref={ref}>
                        <Component onClose={handleDismiss} isOpen={isOpen} {...data} />
                    </StyledModalContainer>
                </FocusScope>
            </StyledUnderlay>
        </OverlayContainer>
    ) : null;
}

export function ModalDisplay() {
    const modalState = useModalState();
    const modals = Object.keys(modalState).map((modalKey) => (
        // eslint-disable-next-line security/detect-object-injection
        <Modal key={modalKey} modalKey={modalKey} {...modalState[modalKey]} />
    ));

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <Fragment>{modals}</Fragment>;
}
