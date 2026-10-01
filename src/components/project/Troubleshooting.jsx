import styled from "styled-components";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import Text from "../ui/Text";
import Icon from "../ui/Icon";
import Section from "../common/Section";
import { Column, Row } from "../layout/Layout";
import { getTroubleshootings } from "../../data/troubleshootings";
import { media } from "../../styles/media";

/* 본문이 길어서 한 건이 곧 한 페이지다. 여기서는 고를 수 있을 만큼만 보여준다 */
function Troubleshooting({ projectId }) {
  const items = getTroubleshootings(projectId);

  if (items.length === 0) return null;

  return (
    <Section title="Troubleshooting">
      <Column $gap={2}>
        {items.map((item) => (
          <ItemLink
            key={item.id}
            to={`/projects/${projectId}/troubleshooting/${item.id}`}
          >
            <Column $gap={1}>
              <Text as="h3" size="text" weight="semibold">
                {item.title}
              </Text>
              <Text size="note" color="text-secondary">
                {item.summary}
              </Text>
            </Column>

            <Meta $gap={2}>
              <Area size="caption">{item.area}</Area>
              <Icon component={ArrowUpRight} size="md" color="text-secondary" />
            </Meta>
          </ItemLink>
        ))}
      </Column>
    </Section>
  );
}

export default Troubleshooting;

//---------------------styled----------------//

const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-3);
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-3) var(--spacing-4);
  transition: border-color var(--motion-fast);

  &:hover {
    border-color: var(--color-border-focus);
  }
`;

const Meta = styled(Row)`
  align-items: center;
  flex: 0 0 auto;

  ${media.maxSm} {
    /* 좁은 화면에서는 영역 태그를 접고 화살표만 남긴다 */
    > *:first-child {
      display: none;
    }
  }
`;

const Area = styled(Text)`
  color: var(--component-chip-accent-text);
  background: var(--component-chip-accent-background);
  border-radius: var(--component-chip-accent-radius);
  padding: var(--spacing-1) var(--spacing-3);
  white-space: nowrap;
`;
