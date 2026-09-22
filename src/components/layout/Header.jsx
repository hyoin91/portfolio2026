import styled from "styled-components";
import {Link} from "react-router-dom";
import Avatar from "../ui/Avatar";
import Nav from "./Nav";
import ThemeToggle from "../ui/ThemeToggle"
import {media} from"../../styles/media"
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
    width:100%;
    display: flex ;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    ${media.maxMd}{
            margin-bottom: 1rem;
    }
`;
const RightWrap =  styled.div`
    display: flex;
    gap:12px;
`;