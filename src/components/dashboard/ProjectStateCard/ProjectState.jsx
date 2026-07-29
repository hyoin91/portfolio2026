import styled from "styled-components";
import Text from "../../ui/Text";
import { Row } from "../../layout/Layout";
import Section from "../../common/Section";
import { getRoleStats } from "../../../data/projects";
import StateBar from "./StateBar";

const roleMeta =[
  { role: "frontend",   label: "Frontend",   color: "brand-primary" },
  { role: "design",     label: "Design",     color: "accent-primary" },
  { role: "publishing", label: "Publishing", color: "brand-secondary" },
];

function  ProjectState(){

    const counts =  getRoleStats(); //roles 갯수
    const roles =  roleMeta.map((meta)=>({
        ...meta,
        count: counts[meta.role] ?? 0, 
    }));
    const total = roles.reduce((sum,role)=>
        sum + role.count, 
        0
    );

    return(
    <Section
        title="Project State"
        action={
            <TotalRow $gap={1}>
                <Text 
                    as="span"
                    size="caption"
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
