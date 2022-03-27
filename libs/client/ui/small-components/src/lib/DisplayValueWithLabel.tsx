import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { Coins } from '@mr/client/data-access/user-store';

const StyledField = styled.div`
    display: flex;
    align-items: center;
    padding: 0.2em 0.4em;
`;
const StyledLabel = styled.div`
    font-weight: bold;

    width: 150px;
    margin-right: 12px;
`;

const StyledDisplayName = styled.div``;

export const DisplayDeposit = observer(({ label, getValue }: { label: string; getValue: () => Coins }) => {
    const value = Object.entries(getValue()).reduce((sum, [denom, amount]) => sum + Number(denom) * amount, 0);
    return (
        <StyledField>
            <StyledLabel>{label}:</StyledLabel>
            <StyledDisplayName>{value}</StyledDisplayName>
        </StyledField>
    );
});

export const DisplayString = observer(({ getValue, label }: { label: string; getValue: () => number | string }) => {
    return (
        <StyledField>
            <StyledLabel>{label}:</StyledLabel>
            <StyledDisplayName>{getValue()}</StyledDisplayName>
        </StyledField>
    );
});
