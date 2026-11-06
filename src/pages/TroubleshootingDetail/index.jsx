import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";

import Text from "../../components/ui/Text";
import Badge from "../../components/ui/Badge";
import Icon from "../../components/ui/Icon";
import Section from "../../components/common/Section";
import CodeBlock from "../../components/project/CodeBlock";
import { Column, Row, Wrap } from "../../components/layout/Layout";

import { getProject } from "../../data/projects";
import { getTroubleshooting } from "../../data/troubleshootings";

function TroubleshootingDetail() {
  const { id, tsId } = useParams();
  const project = getProject(id);
  const item = getTroubleshooting(id, tsId);

  if (!item) {
    return (
      <Column $gap={4}>
        <Text size="heading">트러블슈팅을 찾을 수 없습니다</Text>
        <Link to={`/projects/${id}`}>프로젝트로 돌아가기</Link>
      </Column>
    );
  }

  return (
    <Page $gap={6}>
      <Column $gap={3}>
        <BackLink to={`/projects/${id}`}>
          <Icon component={ArrowLeft} size="sm" color="text-secondary" />
          <Text size="note" color="text-secondary">
            {project?.name ?? "프로젝트"} 트러블슈팅
          </Text>
        </BackLink>

        <Text as="h1" size="heading">{item.title}</Text>

        <Row $gap={2}>
          <Badge>{item.area}</Badge>
          {item.feature && (
            <Text size="caption" color="text-tertiary">{item.feature}</Text>
          )}
        </Row>
      </Column>

      <Section title="문제 상황">
        <Text size="text">{item.problem}</Text>
      </Section>

      {item.investigation?.length > 0 && (
        <Section title="원인 파악">
          {item.investigationIntro && (
            <Text size="text">{item.investigationIntro}</Text>
          )}
          <Steps>
            {item.investigation.map((step) => (
              <Step key={step}>
                <Text size="text" color="text-secondary">{step}</Text>
              </Step>
            ))}
          </Steps>
        </Section>
      )}

      {item.cause?.length > 0 && (
        <Section title="원인">
          {item.causeIntro && <Text size="text">{item.causeIntro}</Text>}
          <Column $gap={2}>
            {item.cause.map((line) => (
              <Bullet key={line} $gap={2}>
                <Dot />
                <Text size="text" color="text-secondary">{line}</Text>
              </Bullet>
            ))}
          </Column>
        </Section>
      )}

      {item.solution?.length > 0 && (
        <Section title="해결 방법">
          <Column $gap={5}>
            {item.solution.map((block, index) => (
              <Column key={block.text ?? index} $gap={2}>
                {block.text && (
                  <Row $gap={2}>
                    <StepNo size="text" weight="bold" color="text-brand">
                      {index + 1}
                    </StepNo>
                    <Text size="text" weight="semibold">{block.text}</Text>
                  </Row>
                )}

                <CodeBlock code={block.code} lang={block.lang} />

                {block.table && (
                  <TableWrap>
                    <Table>
                      <thead>
                        <tr>
                          {block.table.head.map((cell) => (
                            <Th key={cell}>
                              <Text size="caption" weight="semibold">{cell}</Text>
                            </Th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.table.rows.map((row) => (
                          <tr key={row.join("|")}>
                            {row.map((cell) => (
                              <Td key={cell}>
                                <Text size="note" color="text-secondary">{cell}</Text>
                              </Td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TableWrap>
                )}

                {block.note && (
                  <Note size="note" color="text-secondary">{block.note}</Note>
                )}
              </Column>
            ))}
          </Column>
        </Section>
      )}

      {item.contribution?.length > 0 && (
        <Section title="문제 해결 과정에서의 역할">
          <WhoList rows={item.contribution} />
        </Section>
      )}

      <Section title="결과">
        <Text size="text">{item.result}</Text>
        {item.tech?.length > 0 && (
          <Wrap $gap={2}>
            {item.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </Wrap>
        )}
      </Section>

      {item.verification?.length > 0 && (
        <Section title="검증">
          <WhoList rows={item.verification} />
        </Section>
      )}

      {item.lessons?.length > 0 && (
        <Section title="배운 점" variant="feature">
          <Column $gap={2}>
            {item.lessons.map((line) => (
              <Text key={line} size="text" color="text-on-feature">{line}</Text>
            ))}
          </Column>
        </Section>
      )}
    </Page>
  );
}

export default TroubleshootingDetail;

/* 「누가 무엇을 했나」 목록 — Contribution과 Verification이 같은 모양이라 함께 쓴다 */
function WhoList({ rows }) {
  return (
    <Column $gap={2}>
      {rows.map((row) => (
        <WhoRow key={row.who + row.text} $gap={3}>
          <Who size="caption" weight="semibold" color="text-brand">{row.who}</Who>
          <Text size="text" color="text-secondary">{row.text}</Text>
        </WhoRow>
      ))}
    </Column>
  );
}

//---------------------styled----------------//

/* 페이지 맨 아래 여백 — 마지막 카드가 화면 끝에 붙어 보이지 않게 */
const Page = styled(Column)`
  padding-bottom: var(--spacing-16);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  align-self: flex-start;
`;

const Steps = styled.ol`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  counter-reset: step;
  list-style: none;
`;

const Step = styled.li`
  display: flex;
  gap: var(--spacing-3);
  counter-increment: step;

  &::before {
    content: counter(step);
    flex: 0 0 auto;
    min-width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--color-brand-subtle);
    color: var(--color-text-brand);   /* 12px 작은 숫자라 진한 파랑(대비 확보) */
    font-size: var(--font-sizes-12);
    font-weight: var(--font-weights-semibold);
  }
`;

const Bullet = styled(Row)`
  align-items: flex-start;
`;

const Dot = styled.span`
  flex: 0 0 auto;
  width: 5px;
  height: 5px;
  margin-top: 0.6em;
  border-radius: 50%;
  background: var(--color-brand-primary);
`;

const StepNo = styled(Text)`
  flex: 0 0 auto;
`;

/* 좁은 화면에서 표가 페이지를 밀지 않도록 표만 따로 스크롤 */
const TableWrap = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  text-align: left;
  padding: var(--spacing-2) var(--spacing-3);
  border-bottom: 1px solid var(--color-border-default);
  white-space: nowrap;
`;

const Td = styled.td`
  padding: var(--spacing-2) var(--spacing-3);
  border-bottom: 1px solid var(--color-border-default);
  vertical-align: top;
`;

const Note = styled(Text)`
  border-left: 2px solid var(--color-border-default);
  padding-left: var(--spacing-3);
`;

const WhoRow = styled(Row)`
  align-items: baseline;
`;

/* 고정폭이라 모든 줄의 설명 시작 위치가 맞는다 (ListRow의 Name과 같은 방식) */
const Who = styled(Text)`
  flex: 0 0 44px;
`;
