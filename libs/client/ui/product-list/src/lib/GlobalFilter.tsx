import { useState } from 'react';
import { Row, useAsyncDebounce } from 'react-table';

interface IGlobalFilterProps {
    globalFilter: any;
    preGlobalFilteredRows: Row<Record<string, any>>[];
    setGlobalFilter: (filterValue: any) => void;
}
// eslint-disable-next-line max-lines-per-function
export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: IGlobalFilterProps) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{' '}
            <input
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    );
}
