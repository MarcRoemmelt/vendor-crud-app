import { createElement, ReactNode, ReactHTML } from 'react';
import styled, { css } from 'styled-components';

export interface StyledPageDescriptionProps {
    tag?: keyof ReactHTML;
    children: ReactNode;
}

const styles = css`
    width: 100%;
    max-width: 600px;
    font-size: 1.6em;
    color: ${({ theme }) => theme.primaryColor};
    text-align: center;
    color: ${({ theme }) => theme.primaryColor};

    a {
        color: ${({ theme }) => theme.secondaryColor};
        font-weight: bold;
        border-bottom: 1px solid ${({ theme }) => theme.secondaryColor};
        &:hover {
            border-color: transparent;
        }
    }
`;

export const StyledPageDescription = styled(({ children, tag = 'p', ...props }: StyledPageDescriptionProps) =>
    createElement(tag, props, children),
)`
    ${styles}
`;

export default StyledPageDescription;
