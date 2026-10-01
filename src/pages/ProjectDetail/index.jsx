import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import Text from "../../components/ui/Text";
import Badge from "../../components/ui/Badge";
import Section from "../../components/common/Section";
import { Column, Row, Wrap } from "../../components/layout/Layout";

import DesignPoints from "../../components/project/DesignPoints";
import Troubleshooting from "../../components/project/Troubleshooting";

import { getProject, ROLE_LABELS } from "../../data/projects";
import { media } from "../../styles/media";

function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id);

  if (!project) {
    return (
      <Column $gap={4}>
        <Text size="heading">프로젝트를 찾을 수 없습니다</Text>
        <Link to="/projects">목록으로</Link>
      </Column>
    );
  }

  /* 예전에 추가된 프로젝트에는 새 필드가 없을 수 있으므로 전부 기본값을 깐다 */
  const features = project.features ?? [];
  const designPoints = project.designPoints ?? [];

  return (
    <Column $gap={6}>
      <Column $gap={2}>
        <Text as="h1" size="display">{project.name}</Text>
        <Text size="body" color="text-secondary">{project.summary}</Text>
        <Wrap $gap={2}>
          {project.roles.map((role) => {
            /* variant에는 코드값, 화면 글자는 ROLE_LABELS + 기여도 */
            const label = ROLE_LABELS[role] ?? role;
            const percent = project.contribution?.[role];
            return (
              <Badge key={role} variant={role}>
                {percent != null ? `${label} ${percent}%` : label}
              </Badge>
            );
          })}
          <Period size="caption" color="text-tertiary">{project.period}</Period>
        </Wrap>
      </Column>

      <Section title="Overview">
        <OverviewBody $gap={5}>
          {/* 이미지가 없는 프로젝트는 글만 전체 폭으로 나온다 */}
          {project.cover && (
            <Cover src={project.cover} alt={project.coverAlt ?? project.name} />
          )}
          <Column $gap={3}>
            <Text size="text">{project.description}</Text>
            <Wrap $gap={2}>
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </Wrap>
          </Column>
        </OverviewBody>
      </Section>

      {features.length > 0 && (
        <Section title="Key Features">
          <FeatureGrid>
            {features.map((feature) => (
              <FeatureCard key={feature.title} $gap={1}>
                <Text as="h3" size="text" weight="semibold">
                  {feature.title}
                </Text>
                {/* 상세 페이지는 detailDesc 우선, 없으면 대시보드용 desc로 대체 */}
                <Text size="note" color="text-secondary">
                  {feature.detailDesc ?? feature.desc}
                </Text>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Section>
      )}

      <DesignPoints points={designPoints} />

      <Troubleshooting projectId={project.id} />
    </Column>
  );
}

export default ProjectDetail;

//---------------------styled----------------//

const Period = styled(Text)`
  align-self: center;
`;

/* 이미지 + 설명을 나란히. 좁아지면 세로로 쌓는다 */
const OverviewBody = styled(Row)`
  align-items: flex-start;

  ${media.maxSm} {
    flex-direction: column;
  }
`;

const Cover = styled.img`
  flex: 0 0 180px;
  width: 180px;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border-default);

  ${media.maxSm} {
    flex: 0 0 auto;
    width: 140px;
    align-self: center;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3);

  ${media.maxSm} {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Column)`
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-4);
`;
