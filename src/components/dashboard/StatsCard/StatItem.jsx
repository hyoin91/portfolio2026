import styled from "styled-components";
import Icon from "../../ui/Icon";
import Text from "../../ui/Text";
import { Column, Row } from "../../layout/Layout";

function StatItem({ icon, value, label }) {
  return (
    <Item>
      <TopRow>
        <Icon component={icon} size="sm" color="brand-primary" />
        <Text size="display">{value}</Text>
      </TopRow>
      <Text size="caption" color="text-secondary">
        {label}
      </Text>
    </Item>
  );
}

export default StatItem;

//---------------------styled----------------//
const Item = styled(Column)`
  &:not(:last-child) {
    border-right: 1px dashed var(--color-border-default);
  }
`;

const TopRow = styled(Row)`
  align-items: baseline;
  gap: var(--spacing-1);
`;
