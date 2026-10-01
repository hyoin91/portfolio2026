import styled from "styled-components";
import Text from "../ui/Text";
import Section from "../common/Section";
import { Column } from "../layout/Layout";
import { media } from "../../styles/media";

function DesignPoints({ points = [] }) {
  if (points.length === 0) return null;

  return (
    <Section title="Architecture">
      <Grid>
        {points.map((point, index) => (
          <Card key={point} $gap={2}>
            <Num size="heading" weight="bold" color="text-brand">
              {String(index + 1).padStart(2, "0")}
            </Num>
            <Text size="text">{point}</Text>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

export default DesignPoints;

//---------------------styled----------------//

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-3);

  ${media.maxSm} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Column)`
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-4);
`;

/* 번호는 장식이라 화면 낭독에서 빼준다 */
const Num = styled(Text).attrs({ "aria-hidden": true })`
  line-height: 1;
  opacity: 0.35;
`;
