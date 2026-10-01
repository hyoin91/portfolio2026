import styled from "styled-components";
import Text from "../../ui/Text"
import { Column } from "../../layout/Layout";
import{media}from "../../../styles/media"
import RoleBar from "./RoleBar";

    const roles = [
        {label: "react" , percent:28, color:"brand-primary"},
        {label: "Design" , percent:36, color: "brand-secondary"},
        {label: "Publishing" , percent:36, color: "brand-primary-active"},
    ]
function RoleBalance(){

    return(
        <Wrapper $gap={1}>

             <RoleBar roles={roles} />
        </Wrapper>
    );

}
export default RoleBalance;


//---------------------styled--1--------------//

 const Wrapper = styled(Column)`
  width:330px;
  ${media.maxSm}{
    width:280px;
  }
`;







