import 'react-table';

declare module 'react-table' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UseTableInstanceProps<D extends Record<string, any>> extends UseGlobalFiltersInstanceProps<D> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface TableState<D> extends UseGlobalFiltersState<D> {}
}
