import styled from "styled-components";
import Text from "../../ui/Text";
import { Row } from "../../layout/Layout";
import Section from "../../common/Section";
import { getRoleStats, ROLE_LABELS } from "../../../data/projects";

import StateBar from "./StateBar";

const roleMeta =[
  /* 역할 색은 토큰 role.* 한 곳에서 — RoleBalance·역할 뱃지와 같은 색 */
  { role: "frontend", color: "role-frontend" },
  { role: "design",  color: "role-design" },
  { role: "publishing",color: "role-publishing" },
];

function  ProjectState(){

    const counts =  getRoleStats(); //roles 갯수
    const roles =  roleMeta.map((meta)=>({
        ...meta,
        label: ROLE_LABELS[meta.role],
        count: counts[meta.role] ?? 0, 
    }));
    const total = roles.reduce((sum,role)=>
        sum + role.count, 
        0
    );

    return(
    <Section
        title="Project State"
        gap={1}
        action={
            <TotalRow $gap={2}>
                <Text 
                    as="span"
                    
                    color="text-secondary"
                    >
                    Total
                </Text>
                <Text as="span" size="display">
                     {total}
                </Text>
            </TotalRow>
        }
    >
        <StateBar
            roles={roles}
            total={total}
        />

    </Section>
);
}

export default ProjectState;

//---------------------styled----------------//

const TotalRow = styled(Row)`
  align-items: baseline;
`;
