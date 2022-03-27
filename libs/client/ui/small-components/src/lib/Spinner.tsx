import styled from 'styled-components';

interface ISpinnerProps {
    height?: string;
    width?: string;
    size?: string;
}
export const Spinner = ({ height, width, size }: ISpinnerProps) => {
    return (
        <StyledContainer height={height} width={width}>
            <StyledSpinner size={size} />
        </StyledContainer>
    );
};
const StyledContainer = styled.div<{ height?: string; width?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width ?? '100%'};
    height: ${({ height }) => height ?? '100%'};
    margin: auto;
`;
const StyledSpinner = styled.div<{ size?: string }>`
    width: ${({ size }) => (size ? size : '80px')};
    height: ${({ size }) => (size ? size : '80px')};
    border-radius: 9999px;
    border-style: solid;
    border-width: 3px;
    border-top-color: ${({ theme }) => theme.primaryColor};
    border-bottom-color: ${({ theme }) => theme.primaryColor};
    border-left-color: transparent;
    border-right-color: transparent;

    animation: spin 0.8s ease-in-out infinite;

    @keyframes spin {
        from {
            transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
    }
`;
