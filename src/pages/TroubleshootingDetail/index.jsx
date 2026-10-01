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
    <Column $gap={6}>
      <Column $gap={3}>
        <BackLink to={`/projects/${id}`}>
          <Icon component={ArrowLeft} size="sm" color="text-secondary" />
          <Text size="note" color="text-secondary">
            {project?.name ?? "프로젝트"} Troubleshooting
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

      <Section title="Problem">
        <Text size="text">{item.problem}</Text>
      </Section>

      {item.investigation?.length > 0 && (
        <Section title="Investigation">
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
        <Section title="Cause">
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
        <Section title="Solution">
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

      <Section title="Result">
        <Text size="text">{item.result}</Text>
        {item.tech?.length > 0 && (
          <Wrap $gap={2}>
            {item.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </Wrap>
        )}
      </Section>

      {item.value && (
        <Section title="What this shows" variant="feature">
          <Text size="text" color="text-on-feature">{item.value}</Text>
        </Section>
      )}
    </Column>
  );
}

export default TroubleshootingDetail;

//---------------------styled----------------//

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
    color: var(--color-brand-primary);
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
