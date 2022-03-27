import type { AriaButtonProps } from '@react-types/button';
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, MouseEventHandler, ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import styled, { css } from 'styled-components';
import classnames from 'classnames';
import Link from 'next/link';
import { mergeProps } from '@react-aria/utils';

type ButtonTypeProps =
    | { href: string; onClick?: never }
    | {
          href?: never;
          onPress: MouseEventHandler<HTMLButtonElement>;
      }
    | {
          type: 'submit';
          href?: never;
          onPress?: never;
      };
type ButtonProps = {
    ref: ForwardedRef<unknown>;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    children: ReactNode;
    size?: Size;
} & AriaButtonProps<'button'> &
    ButtonTypeProps;

export type IcButtonProps = ButtonProps;

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

const buttonStyles = css<ButtonHTMLAttributes<HTMLButtonElement> & { size?: Size }>`
    color: ${({ theme }) => theme.primaryColor || 'black'};
    border-color: ${({ theme }) => theme.primaryColor || 'black'};
    background-color: ${({ theme }) => theme.primaryColorContrast || 'white'};
    border-style: solid;
    border-width: 3px;
    margin-left: 0.1em;
    margin-right: 0.1em;

    cursor: pointer;

    font-size: ${({ size }) => {
        switch (size) {
            case 'xl':
                return '1.6em';
            case 'l':
                return '1.3em';
            case 'm':
                return '1em';
            case 's':
                return '0.8em';
            case 'xs':
                return '0.6em';
            default:
                return '1em';
        }
    }};

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
const _StyledIcButtonWithRef = forwardRef<HTMLButtonElement>((props, ref) => <StyledIcButton {...props} ref={ref} />);

const StyledIcLink = styled.a`
    ${buttonStyles}
    text-decoration: inherit;
`;

const classes = (isHovered: boolean, isFocusVisible: boolean, isPressed: boolean) =>
    classnames({
        'is-hovered': isHovered,
        'is-focused': isFocusVisible,
        'is-pressed': isPressed,
    });

/* eslint-disable */
const AriaButton = forwardRef<HTMLElement, ButtonProps>((props, forwardedRef) => {
    const newRef = useRef(null);

    const ref = forwardedRef && 'current' in forwardedRef ? forwardedRef : newRef;
    const { buttonProps, isPressed } = useButton({ ...props, elementType: props.href ? Link : StyledIcButton }, ref);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover(props);

    const buttonClasses = classes(isPressed, isFocusVisible, isHovered);

    const { onPress, ...elementProps } = props;
    const mergedProps = mergeProps(buttonProps, focusProps, hoverProps, { className: buttonClasses }, elementProps);

    if (hasHref(props))
        return (
            <Link href={props.href}>
                <StyledIcLink {...mergedProps} />
            </Link>
        );

    return <StyledIcButton {...mergedProps}>{props.children}</StyledIcButton>;
});
function hasHref<T extends ReturnType<typeof mergeProps>>(props: T): props is T & { href: string } {
    return typeof props['href'] === 'string';
}
export const IcButton = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
    return <AriaButton {...props} ref={ref} />;
});

export default IcButton;
