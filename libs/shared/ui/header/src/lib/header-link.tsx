import { ForwardedRef, forwardRef, RefObject, useRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { AriaLinkOptions, useLink as useAriaLink } from '@react-aria/link';
import { mergeProps } from '@react-aria/utils';
import classnames from 'classnames';
import Link from 'next/link';
import styled from 'styled-components';
import { MessageDescriptor, useIntl } from 'react-intl';
import { useRouter } from 'next/router';

export interface HeaderLinkProps {
    name: string | MessageDescriptor;
    href: string;
    icon: any;
}

const StyledHeaderLink = styled.a`
    position: relative;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2em 0.6em;

    border-color: transparent;
    border-style: solid;
    border-width: 3px;

    outline: none;
    font-size: 2em;
    font-weight: 800;
    opacity: 0.6;
    will-change: opacity;

    &.is-hovered {
        opacity: 1;
    }
    &.is-focused {
        opacity: 1;
        border-color: ${({ theme }) => theme.secondaryColor || 'yellow'};
    }
    &.is-active {
        opacity: 1;

        &::after {
            content: '';
            background-color: ${({ theme }) => theme.primaryColor};
            width: 100%;
            height: 3px;
            position: absolute;
            bottom: -3px;
        }
    }
`;

const useLink = (
    props: { link: HeaderLinkProps } & AriaLinkOptions,
    _passedRef: null | RefObject<HTMLElement> | ForwardedRef<HTMLElement> = null,
) => {
    const _newRef = useRef(null);
    const { pathname } = useRouter();
    const ref = _passedRef && 'current' in _passedRef ? _passedRef : _newRef;

    const { linkProps, isPressed } = useAriaLink(props, ref);
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover(props);

    const className = classnames({
        'is-active': props.link.href === pathname,
        'is-hovered': isHovered,
        'is-focused': isFocusVisible,
        'is-pressed': isPressed,
    });
    return mergeProps(linkProps, focusProps, hoverProps, props, { className });
};

const AriaLink = forwardRef<HTMLElement, { link: HeaderLinkProps } & AriaLinkOptions>((props, ref) => {
    const linkProps = useLink(props, ref);
    const intl = useIntl();
    const title = typeof props.link.name === 'string' ? props.link.name : intl.formatMessage(props.link.name);
    return (
        <StyledHeaderLink {...linkProps} title={title}>
            {title}
        </StyledHeaderLink>
    );
});

export function HeaderLink(props: { link: HeaderLinkProps } & AriaLinkOptions) {
    return (
        <Link href={props.link.href} passHref>
            <AriaLink {...props} />
        </Link>
    );
}

export default HeaderLink;
