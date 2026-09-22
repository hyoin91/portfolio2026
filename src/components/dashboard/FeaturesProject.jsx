import styled from "styled-components";
import Text from "../ui/Text";
import Badge from "../ui/Badge";
import {media} from "../../styles/media"
import Section from "../common/Section";
import KeyFeatures from "./KeyFeatures";
import { Column, Row, Wrap } from "../layout/Layout";
import { getProject, ROLE_LABELS } from "../../data/projects";

import ddoksobi from"../../assets/images/project/ddoksobi.svg";

function FeaturesProject ({grow}){

    const project = getProject("goodsobi"); //id

    if(!project) return null

    return(
        <Section
            title="Features Project"
            moreTo={`/projects/${project.id}`}
            grow={grow}
        >
            <FeaturesWrap>
                <FeaturesDescWrap>
  <Row $gap={4}>
                <Thumb src={ddoksobi} alt="굿소비 앱 화면"/> 
          
                <Column $gap={2}>
                    <RowBottom>
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
            </FeaturesWrap>
            
        </Section>
    );
}

export default FeaturesProject;
//---------------------styled----------------//
const RowBottom =  styled(Row)`
   display: flex;
   flex-direction: column;
`;
const Thumb = styled.img`
 flex: 0 0 auto;
    width: 65px;
    height: auto;
`;
const FeaturesDescWrap = styled.div`
    
`;
const FeaturesWrap = styled.div`
    ${media.maxLg}{
        display: flex;
         gap: var(--spacing-4);
         > * {
            flex:1;
             margin-top: 0; 
         }
        > *:first-child { flex: 3; }
        > *:last-child { flex: 7; }
    }
`;