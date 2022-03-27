import { observer } from 'mobx-react-lite';
import { Row, TableRowProps } from 'react-table';
import styled from 'styled-components';

const StyledProductListItem = styled.li`
    display: flex;
`;
type IProductListItemProps = TableRowProps & Row<Record<string, any>>;
export const ProductListItem = observer(({ values }: IProductListItemProps) => {
    return (
        <StyledProductListItem>
            <DisplayName getValue={() => values['productName']} />
            <DisplayName getValue={() => values['amountAvailable']} />
            <DisplayName getValue={() => values['cost']} />
        </StyledProductListItem>
    );
});

const StyledDisplayName = styled.div`
    padding: 0.2em 0.4em;
`;
const DisplayName = observer(({ getValue }: { getValue: () => number | string }) => {
    return <StyledDisplayName>{getValue()}</StyledDisplayName>;
});
