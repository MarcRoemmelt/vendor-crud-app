import { observer } from 'mobx-react-lite';
import { ReactNode, Fragment } from 'react';

import { useMultiSessionWarning } from '@mr/client/features/authentication';

interface ISharedAppRootProps {
    children: ReactNode;
}
export const SharedAppRoot = observer(({ children }: ISharedAppRootProps) => {
    useMultiSessionWarning();

    return <Fragment>{children}</Fragment>;
});
