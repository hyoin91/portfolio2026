import styled from "styled-components";
import Text from "../ui/Text";
import Badge from "../ui/Badge";
import {media} from "../../styles/media"
import Section from "../common/Section";
import KeyFeatures from "./KeyFeatures";
import { Column, Row, Wrap } from "../layout/Layout";
import { getProject, ROLE_LABELS } from "../../data/projects";


function FeaturesProject ({grow}){

    const project = getProject("goodsobi"); //id

    if(!project) return null

    return(
        <Section
            title="Featured Project"
            moreTo={`/projects/${project.id}`}
            grow={grow}
        >
            <FeaturesWrap>
                <FeaturesDescWrap>
  <Row $gap={4}>
                {/* 대표 이미지 = 앱 아이콘. 옆 제목에 이름이 있어 alt 는 비운다 */}
                {project.logo && <Thumb src={project.logo} alt="" />}
          
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
/* 이름 옆에 한 줄 설명. 좁으면 아래로 내려간다 */
const RowBottom =  styled(Row)`
   align-items: baseline;
   flex-wrap: wrap;
   column-gap: var(--spacing-2);
`;
const Thumb = styled.img`
    flex: 0 0 auto;
    width: 90px;
    height: 90px;
    border-radius: var(--border-radius-sm);   /* 56px 의 약 22% — 앱 아이콘 모서리 비율 */
    object-fit: contain;
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