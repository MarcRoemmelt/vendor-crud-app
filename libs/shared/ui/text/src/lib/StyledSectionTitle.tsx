import { createElement, ReactNode, ReactHTML } from 'react';
import styled, { css } from 'styled-components';

/* eslint-disable-next-line */
export interface StyledSectionTitleProps {
    tag?: keyof ReactHTML;
    children: ReactNode;
}

const styles = css`
    width: 100%;
    display: flex;
    justify-content: center;

    text-align: center;
    color: ${({ theme }) => theme.primaryColor};
    font-size: 1.8em;
    font-weight: 800;
`;

export const StyledSectionTitle = styled(({ children, tag = 'h2', ...props }: StyledSectionTitleProps) =>
    createElement(tag, props, children),
)`
    ${styles}
`;

export default StyledSectionTitle;
