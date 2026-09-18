import styled from "styled-components";
import Text from "../ui/Text";
import Badge from "../ui/Badge";
import Section from "../common/Section";
import KeyFeatures from "./KeyFeatures";
import { Column, Row, Wrap } from "../layout/Layout";
import { getProject, ROLE_LABELS } from "../../data/projects";

import ddoksobi from"../../assets/images/project/ddoksobi.svg";

function FeaturesProject (){

    const project = getProject("goodsobi"); //id

    if(!project) return null
    
    return(
        <Section
            title="Features Project"
            moreTo={`/projects/${project.id}`}
        >
            <FeaturesDescWrap>
  <Row $gap={4}>
                <Thumb src={ddoksobi} alt="굿소비 앱 화면"/> 
          
                <Column $gap={2}>
                    <RowBottom $gap={2}>
                        <Text size="title" weight = "semibold">
                            {project.name}
                        </Text>
                        <Text size="body" weight="light" >
                            {project.summary}
                        </Text>
                    </RowBottom>

                    <Wrap $gap={1}>
                        {project.roles.map((role)=>(
                            <Badge 
                                key={role} 
                                variant={role}
                            >
                                {ROLE_LABELS[role]/*???*/}
                            </Badge>
                        ))}
                    </Wrap>
                    <Text size="text" weight="light">
                        {project.description}
                    </Text>
                </Column>
            </Row>
            </FeaturesDescWrap>
          
            <KeyFeatures
                features={project.features}
            />
        </Section>
    );
}

export default FeaturesProject;
//---------------------styled----------------//
const RowBottom =  styled(Row)`
   align-items :baseline;
   
`;
const Thumb = styled.img`
 flex: 0 0 auto;
    width: 65px;
    height: auto;
`;
const FeaturesDescWrap = styled.div`
    
`;