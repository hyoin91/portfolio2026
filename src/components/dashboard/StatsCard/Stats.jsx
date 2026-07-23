import styled from "styled-components";
import { Clock, Folder, Accessibility } from "lucide-react";
import StatItem from "./StatItem";
import { RowBetween } from "../../layout/Layout";

const stats = [
  { icon: Clock, value: "3+", label: "Years" },
  { icon: Folder, value: "21", label: "Projects" },
  { icon: Accessibility, value: "5", label: "WCAG Certified" },
];

function Stats() {
  return (
    <Wrapper>
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
        />
      ))}
    </Wrapper>
  );
}

export default Stats;

//---------------------styled----------------//
const Wrapper = styled(RowBetween)`
  width: 330px;
`;
