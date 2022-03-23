import { IcButton } from '@mr/client/ui/ic-button';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SellPageProps {}

const StyledEntryPage = styled.div`
    color: pink;
`;

export function SellPage(_props: SellPageProps) {
    return (
        <StyledEntryPage>
            <h1>Welcome to EntryPage!</h1>
            <IcButton href="/create" tab-index={0}>
                <FormattedMessage id="pages.entry.buttons.create" defaultMessage="Add Creative" />
            </IcButton>
        </StyledEntryPage>
    );
}

export default SellPage;
