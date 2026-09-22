import styled from "styled-components";
import { Outlet } from "react-router-dom"; //액자틀처럼
import Header from "./Header";
import { media } from "../../styles/media";


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
  width: 100%;
  max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
   padding: var(--spacing-4) var(--spacing-6);
   display: flex;
   flex-direction: column;
   ${media.maxLg}{
     width: 97%;
   }
`;

const Content = styled.main`
  flex: 1;
  //padding: var(--spacing-8);
`;
//---------------------styled----------------//
