import { IcButton } from '@mr/client/ui/ic-button';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface EntryPageProps {}

const StyledEntryPage = styled.div`
    color: pink;
`;

export function BuyPage(_props: EntryPageProps) {
    return (
        <StyledEntryPage>
            <h1>Welcome to BuyPage!</h1>
            <IcButton href="/create" tab-index={0}>
                <FormattedMessage id="pages.entry.buttons.create" defaultMessage="Add Creative" />
            </IcButton>
        </StyledEntryPage>
    );
}

export default BuyPage;
