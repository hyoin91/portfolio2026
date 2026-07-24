import { useParams,Link } from "react-router-dom";
import styled from "styled-components";
import Text from "../../components/ui/Text";
import Badge from "../../components/ui/Badge";
import Section from "../../components/common/Section";
import { Column, Row } from "../../components/layout/Layout";
import { getProject } from "../../data/projects";


function ProjectDetail(){
    const {id} = useParams();
    const project = getProject(id);

    if(!project){
          return (
          <Column $gap={4}>
          <Text size="heading">프로젝트를 찾을 수 없습니다</Text>
          <Link to="/projects">목록으로</Link>
          </Column>
     );
    }

    return(
      <Column $gap={6}>
      <Column $gap={2}>
        <Text as="h1" size="display">{project.name}</Text>
        <Text size="body" color="text-secondary">{project.summary}</Text>
        <Row $gap={2}>
          {project.roles.map((role) => (
            <Badge key={role} variant={role}>{role}</Badge>
          ))}
          <Text size="caption" color="text-tertiary">{project.period}</Text>
        </Row>
      </Column>

      <Section title="Overview">
        <Text size="text">{project.description}</Text>
        <Row $gap={2}>
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </Row>
      </Section>

      {project.features.length > 0 && (
           <Section title="Key Features">
          <Column $gap={3}>
            {project.features.map((feature) => (
              <Column key={feature.title}>
                <Text size="text">{feature.title}</Text>
                <Text size="caption" color="text-secondary">{feature.desc}</Text>
              </Column>
            ))}
          </Column>
        </Section>
      )}
        </Column>
    );
}

export default ProjectDetail;
//---------------------styled----------------//
