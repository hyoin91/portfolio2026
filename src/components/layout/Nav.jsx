import styled from "styled-components";
import { NavLink } from "react-router";


const navItems =[
    {to:"/",label:"Dashboard"},
    {to:"/projects",label:"Projects"},
    {to:"/about",label:"About"},
    {to:"/contact",label:"Contack"}
   // {to:"/design-system",label:"DesignSystem"}
];

function Nav(){
    return(
        <Wrapper>
            {navItems.map((item)=>(
                <StyledNavLink 
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"} 
                    //시작점없이 매칭하게되면? /setting/...으로 시작하는데  
                    // end="/setting" 이 없으면 그냥 setting페이지도 계속 true,
                    // /setting으로시작하는 페이지도 계속 true  
                >
                    {item.label}
                </StyledNavLink>
            ))}
           
        </Wrapper>
    );
}

export default Nav;

const Wrapper = styled.aside`
  width :fit-content ;
  background: var(--component-sidebar-background);
  border-radius: var(--component-sidebar-radius);
  display: flex;
`;
const StyledNavLink = styled(NavLink)`
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--component-sidebar-radius);
  color: var(--component-sidebar-text);
  font-size: var(--font-sizes-14);

  &.active {
    background: var(--component-sidebar-active-background);
    color: var(--component-sidebar-active-text);
  }
`;

//---------------------styled----------------//
