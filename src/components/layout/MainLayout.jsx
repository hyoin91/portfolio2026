import styled from "styled-components";
import { Outlet } from "react-router-dom"; //액자틀처럼
import Header from "./Header";


function MainLayout(){

    return(
        <Wrapper>
            <Header/>
            <Content>
                <Outlet/>
            </Content>
        </Wrapper>
    );
}


export default MainLayout;

 //-------------Styled----------------//

const Wrapper = styled.div`
    width:95%;
    margin:0 auto;
`;

const Content = styled.main`
  flex: 1;
  //padding: var(--spacing-8);
`;
//---------------------styled----------------//
