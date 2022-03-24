import type { AriaButtonProps } from '@react-types/button';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import styled, { css } from 'styled-components';
import classnames from 'classnames';
import Link from 'next/link';
import { AriaLinkOptions, useLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';

type ButtonAction =
    | {
          type?: never;
          href: string;
          onClick?: never;
      }
    | {
          type?: never;
          href?: never;
          onClick: MouseEventHandler<HTMLButtonElement>;
      }
    | {
          type: 'submit';
          href?: never;
          onClick?: never;
      };

export type IcButtonProps =
    | {
          primary?: boolean;
          secondary?: boolean;
          tertiary?: boolean;
          children: ReactNode;
          size?: Size;
      } & ButtonAction;

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

const buttonStyles = css<ButtonHTMLAttributes<HTMLButtonElement> & { size: Size }>`
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
