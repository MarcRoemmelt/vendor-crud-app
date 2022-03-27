import { createElement, ReactNode, ReactHTML } from 'react';
import styled, { css } from 'styled-components';

/* eslint-disable-next-line */
export interface StyledPageTitleProps {
    tag?: keyof ReactHTML;
    children: ReactNode;
}

const styles = css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    text-align: center;
    color: ${({ theme }) => theme.primaryColor};
    font-size: 2.2em;
    font-weight: 800;
`;

export const StyledPageTitle = styled(({ children, tag = 'h1', ...props }: StyledPageTitleProps) =>
    createElement(tag, props, children),
)`
    ${styles}
`;

export default StyledPageTitle;
