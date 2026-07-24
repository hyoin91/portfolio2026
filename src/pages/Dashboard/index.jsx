import Icon from "../../components/ui/Icon";
import {Search,UserRound} from "lucide-react";
import styled from "styled-components"
import {Column, RowBetween} from"../../components/layout/Layout";

import Welcome from "../../components/dashboard/Welcome";
import RoleBalance from "../../components/dashboard/RoleBalanceCard/RoleBalance";
import Stats from "../../components/dashboard/StatsCard/Stats";
import ProfileCard from "../../components/dashboard/ProfileCard";
import SkillsCard from "../../components/dashboard/SkillsCard";
import RecentlyProject from "../../components/dashboard/RecentlyProject";
import LatestUpdates from "../../components/dashboard/LatestUpdates";

function Dashboard() {
  return (
  <Page>
    <Welcome/>
    <RowBetween>
      <RoleBalance/>
      <Stats/>
    </RowBetween>
     <DashboardGrid>
        <Column $gap={4}>
          <ProfileCard />
          <SkillsCard />
        </Column>

        <Column $gap={4}>
           <RecentlyProject />
           <LatestUpdates />
        </Column>

        <Column $gap={4}>
          {/* ProjectState */}
          {/* FeaturesProject */}
        </Column>
      </DashboardGrid>
   </Page>
  );
}

export default Dashboard;

//---------------------styled----------------//
 const Page = styled.div`
   display: flex;
   flex-direction: column;
   gap: var(--spacing-4);
   min-height: 100%;
  
 `;


const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.4fr;
  gap: var(--spacing-4);
  flex:1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;   /* 태블릿: 2열 */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;       /* 모바일: 1열 */
  }
`;