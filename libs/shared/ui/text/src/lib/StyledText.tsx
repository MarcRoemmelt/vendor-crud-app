import { createElement, ReactNode, ReactHTML } from 'react';
import styled, { css } from 'styled-components';

export interface StyledTextProps {
    tag?: keyof ReactHTML;
    children: ReactNode;
}

const styles = css`
    color: ${({ theme }) => theme.primaryColor};
    font-size: 1.2em;
    font-weight: 400;
    margin: 1em 0;
`;

export const StyledText = styled(({ children, tag = 'p', ...props }: StyledTextProps) =>
    createElement(tag, props, children),
)`
    ${styles}
`;

export default StyledText;
