import { createElement, ReactNode, ReactHTML } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StyledPageTitleProps {
    tag?: keyof ReactHTML;
    children: ReactNode;
}

export const StyledPageTitle = styled(({ children, tag = 'h1', ...props }: StyledPageTitleProps) =>
    createElement(tag, props, children),
)`
    color: ${({ theme }) => theme.primaryColor};
    font-size: 2.2em;
    font-weight: 800;
`;

export default StyledPageTitle;
