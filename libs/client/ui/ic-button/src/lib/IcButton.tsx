import type { AriaButtonProps } from '@react-types/button';
import { ButtonHTMLAttributes, ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import styled, { css } from 'styled-components';
import classnames from 'classnames';
import Link from 'next/link';
import { AriaLinkOptions, useLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';

export interface IcButtonProps {
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    href?: string;
    children: ReactNode;
}

const buttonStyles = css<ButtonHTMLAttributes<HTMLButtonElement>>`
    color: ${({ theme }) => theme.primaryColor || 'black'};
    border-color: ${({ theme }) => theme.primaryColor || 'black'};
    background-color: ${({ theme }) => theme.primaryColorContrast || 'white'};
    border-style: solid;
    border-width: 3px;

    cursor: pointer;

    font-weight: bold;

    outline: none;

    padding-top: 0.3em;
    padding-bottom: 0.3em;
    padding-left: 1em;
    padding-right: 1em;

    &.is-hovered {
        background-color: ${({ theme }) => theme.primaryColorContrastShade300 || 'grey'};
    }

    &.is-pressed {
        background-color: ${({ theme }) => theme.primaryColorContrastShade600 || 'darkgrey'};
    }
    &.is-focused {
        border-color: ${({ theme }) => theme.secondaryColor || 'yellow'};
    }
`;

const StyledIcButton = styled.button`
    ${buttonStyles}
`;
const StyledIcLink = styled.a`
    ${buttonStyles}
    text-decoration: inherit;
`;

function AriaLink(props: IcButtonProps & AriaLinkOptions & { href: string }) {
    const ref = useRef(null);
    const { linkProps, isPressed } = useLink(props, ref);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover(props);

    const linkClasses = classnames({
        'is-hovered': isHovered,
        'is-focused': isFocusVisible,
        'is-pressed': isPressed,
    });

    const mergedProps = mergeProps(linkProps, focusProps, hoverProps, props, { className: linkClasses });
    return (
        <Link href={props.href}>
            <StyledIcLink {...mergedProps} />
        </Link>
    );
}
function AriaButton(props: IcButtonProps & AriaButtonProps<'button'>) {
    const ref = useRef(null);
    const { buttonProps, isPressed } = useButton(props, ref);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover(props);

    const buttonClasses = classnames({
        'is-hovered': isHovered,
        'is-focused': isFocusVisible,
        'is-pressed': isPressed,
    });

    const mergedProps = mergeProps(buttonProps, focusProps, hoverProps, props, { className: buttonClasses });
    return <StyledIcButton {...mergedProps}>{props.children}</StyledIcButton>;
}
function hasHref<T extends ReturnType<typeof mergeProps>>(props: T): props is T & { href: string } {
    return typeof props['href'] === 'string';
}
export function IcButton(props: IcButtonProps) {
    if (hasHref(props)) return <AriaLink {...props} />;
    else return <AriaButton {...props} />;
}

export default IcButton;
