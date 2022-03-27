import styled from 'styled-components';
import HeaderLink, { HeaderLinkProps } from './header-link';

export interface HeaderProps {
    links: HeaderLinkProps[];
}

const StyledHeader = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;

    margin-bottom: 30px;
`;

export function Header(props: HeaderProps) {
    return (
        <StyledHeader>
            {props.links.map((link) => (
                <HeaderLink key={link.href} link={link} />
            ))}
        </StyledHeader>
    );
}

export default Header;
