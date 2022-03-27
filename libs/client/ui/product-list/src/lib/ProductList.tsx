import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useTable, Column, useGlobalFilter, Row, TableRowProps } from 'react-table';

import { ProductListItem } from './ProductListItem';
import { Fragment } from 'react';

import { GlobalFilter } from './GlobalFilter';

declare module 'react-table' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TableState<D> extends UseGlobalFiltersState<D> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TableInstance<D> extends UseGlobalFiltersInstanceProps<D> {}
}

interface IProductListProps<D extends Record<string, any> = Record<string, any>> {
    columns: Column<D>[];
    products: readonly D[];
    listItemComponent?: React.ComponentType<Row<Record<string, any>> & TableRowProps>;
}
const StyledList = styled.ul`
    padding: 0;
    margin: 25px;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fill, minmax(250px, 20%));
    grid-template-rows: auto;
    grid-gap: 16px;
    justify-content: center;
    width: 100%;
`;
export const ProductList = observer(
    // eslint-disable-next-line max-lines-per-function
    ({ columns, products, listItemComponent: ListItemComponent = ProductListItem }: IProductListProps) => {
        const { setGlobalFilter, prepareRow, rows, state, preGlobalFilteredRows } = useTable(
            {
                columns,
                data: products,
            },
            useGlobalFilter,
        );

        return (
            <Fragment>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    setGlobalFilter={setGlobalFilter}
                    globalFilter={state.globalFilter}
                />
                <StyledList>
                    {rows.map((row) => {
                        prepareRow(row);
                        return <ListItemComponent {...row.getRowProps()} {...row} />;
                    })}
                </StyledList>
            </Fragment>
        );
    },
);

export default ProductList;
