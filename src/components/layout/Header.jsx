import styled from "styled-components";
import Avatar from "../ui/Avatar";
import Nav from "./Nav";
import ThemeToggle from "../ui/ThemeToggle"
import logoSrc from "../../assets/icons/logo.svg"

function Header(){

    return(
<Wrapper>
 <Logo src={logoSrc} alt="로고이미지" />
 <RightWrap>
    <Nav/>
    <ThemeToggle/>
    <Avatar/>
 </RightWrap>

</Wrapper>
        
    );
}
export default Header;
//---------------------styled----------------//
const Logo = styled.img`
    width: var(--sizing-avatar-md);
    height: var(--sizing-avatar-md);
`;

const Wrapper =  styled.section`
margin-top:var(--spacing-8);
    width:100%;
    display: flex ;
    justify-content: space-between;
    align-items: center;
`;
const RightWrap =  styled.div`
    display: flex;
    gap:12px;
`;