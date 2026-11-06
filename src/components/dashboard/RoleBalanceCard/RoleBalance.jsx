import styled from "styled-components";
import Text from "../../ui/Text"
import { Column } from "../../layout/Layout";
import{media}from "../../../styles/media"
import RoleBar from "./RoleBar";

    const roles = [
        /* 역할 색은 토큰 role.* 한 곳에서 — Project State·역할 뱃지와 같은 색 */
        {label: "react" , percent:28, color:"role-frontend"},
        {label: "Design" , percent:36, color: "role-design"},
        {label: "Publishing" , percent:36, color: "role-publishing"},
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







