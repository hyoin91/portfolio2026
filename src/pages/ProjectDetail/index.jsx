import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import Text from "../../components/ui/Text";
import Badge from "../../components/ui/Badge";
import Section from "../../components/common/Section";
import { Column, Row, Wrap } from "../../components/layout/Layout";

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

  return (
    <Page $gap={6}>
      <Column $gap={2}>
        <TitleRow $gap={3}>
          {/* 로고가 없는 프로젝트는 제목만 나온다 */}
          {project.logo && <TitleLogo src={project.logo} alt="" />}
          <Text as="h1" size="display">{project.name}</Text>
          <Text size="body" color="text-secondary">{project.summary}</Text>
        </TitleRow>
        
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

      <Section title="개요">
        <OverviewBody $gap={5}>
          <OverviewTop $gap={6}>
            {/* 화면이 없는 프로젝트는 글만 나온다 */}
            {project.screens?.length > 0 && (
              <Screens>
                {project.screens.map((screen) => (
                  /* 캡션은 화면마다 다르므로 key로 쓴다 (src는 임시 이미지가 같아서 겹친다) */
                  <Screen key={screen.caption}>
                    <ScreenImg src={screen.src} alt={screen.alt ?? screen.caption} />
                    <Text as="figcaption" size="caption" color="text-tertiary">
                      {screen.caption}
                    </Text>
                  </Screen>
                ))}
              </Screens>
            )}

            {/* qr 키가 있는 프로젝트만. 값이 null이면 자리만 잡아 둔다 */}
            {project.qr !== undefined && (
              <QrBox $gap={2}>
                {project.qr ? (
                  <QrImg src={project.qr} alt={`${project.name} QR 코드`} />
                ) : (
                  <QrPlaceholder>
                    <Text size="caption" color="text-tertiary">QR 준비 중</Text>
                  </QrPlaceholder>
                )}
                <Text size="caption" color="text-secondary">
                  {project.qrCaption ?? "모바일에서 열기"}
                </Text>
              </QrBox>
            )}
          </OverviewTop>
          <Column $gap={3}>
            <Text size="text">{project.description}</Text>
            {/* 상세에서만 보이는 보충 설명 — 메인 카드는 description 한 줄만 쓴다 */}
            {project.overviewNote && (
              <Text size="note" color="text-secondary">{project.overviewNote}</Text>
            )}
            <Wrap $gap={2}>
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </Wrap>
          </Column>
        </OverviewBody>
      </Section>

      {features.length > 0 && (
        <Section id="key-features" title="주요 기능">
          <FeatureGrid>
            {features.map((feature) => (
              <FeatureCard key={feature.title} $gap={2}>
                <Column $gap={1}>
                  <Text as="h3" size="text" weight="semibold">
                    {feature.title}
                  </Text>
                  {/* «뭔지» 한 줄 — 대부분은 여기까지만 읽는다 */}
                  {feature.summary && (
                    <Text size="note" color="text-secondary">{feature.summary}</Text>
                  )}
                </Column>
                {/* «어떻게» — 궁금한 사람만 보는 짧은 구현 포인트 */}
                {feature.points?.length > 0 && (
                  <Points>
                    {feature.points.map((point) => (
                      <li key={point}>
                        <Text size="caption" color="text-tertiary">{point}</Text>
                      </li>
                    ))}
                  </Points>
                )}
              </FeatureCard>
            ))}
          </FeatureGrid>
        </Section>
      )}


      <Troubleshooting projectId={project.id} />
    </Page>
  );
}

export default ProjectDetail;

//---------------------styled----------------//

/* 페이지 맨 아래 여백 — 마지막 카드가 화면 끝에 붙어 보이지 않게 */
const Page = styled(Column)`
  padding-bottom: var(--spacing-16);
`;

const TitleRow = styled(Row)`
      align-items: baseline;
`;

const TitleLogo = styled.img`
  flex: 0 0 auto;
  width: var(--sizing-icon-xl);
  height: var(--sizing-icon-xl);
  border-radius: var(--border-radius-sm);
  object-fit: contain;   /* 정사각형이 아닌 로고(예술의전당 34×22)도 잘리지 않게 */
`;

const Period = styled(Text)`
  align-self: center;
`;

/* 이미지 + 설명을 나란히. 좁아지면 세로로 쌓는다 */
/* 이미지 위 · 글 아래. 설명이 짧아서 옆에 나란히 두면 공간이 많이 남는다 */
const OverviewBody = styled(Column)``;

/* 화면들(왼쪽) + QR(오른쪽) */
const OverviewTop = styled(Row)`
  align-items: flex-start;
`;

/* QR — 오른쪽 끝에 붙인다. 이미 휴대폰으로 보는 사람에겐 필요 없으니 좁은 화면에선 숨긴다 */
const QrBox = styled(Column)`
  flex: 0 0 auto;
  margin-left: auto;
  align-items: center;

  ${media.maxSm} {
    display: none;
  }
`;

const QrImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border-default);
`;

const QrPlaceholder = styled.div`
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  border-radius: var(--border-radius-sm);
  border: 1px dashed var(--color-border-default);
  background: var(--color-surface-secondary);
`;

/* 모바일 화면 나란히. 좁은 화면에서는 줄바꿈 대신 가로로 밀어서 본다 */
const Screens = styled.div`
  flex: 1;
  min-width: 0;   /* 이게 없으면 flex 자식이 내용만큼 버텨서 가로 스크롤이 안 생기고 QR을 밀어낸다 */
  display: flex;
  gap: var(--spacing-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: var(--spacing-2);   /* 그림자·스크롤바가 잘리지 않게 */
`;

const Screen = styled.figure`
  flex: 0 0 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
  margin: 0;
  scroll-snap-align: start;
`;

/* 기기 프레임 없이 둥근 모서리 + 얇은 테두리 + 옅은 그림자만.
   세로 캡처(약 9:19.5)를 잘라내지 않고 비율을 고정한다 */
const ScreenImg = styled.img`
  width: 100%;
  aspect-ratio: 9 / 19.5;
  object-fit: cover;
  object-position: top;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-default);
  box-shadow: var(--box-shadow-card);
  background: var(--color-surface-secondary);
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

/* 구현 포인트 — 점(·)으로 시작하는 짧은 목록 */
const Points = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  list-style: none;
  padding: 0;
  margin: 0;

  li::before {
    content: "· ";
    color: var(--color-text-tertiary);
  }
`;
