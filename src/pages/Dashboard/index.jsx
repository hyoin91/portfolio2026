import Icon from "../../components/ui/Icon";
import {Search,UserRound} from "lucide-react";
import styled from "styled-components"
import {Column, RowBetween} from"../../components/layout/Layout";
import { media } from "../../styles/media";

import Welcome from "../../components/dashboard/Welcome";
import RoleBalance from "../../components/dashboard/RoleBalanceCard/RoleBalance";
import Stats from "../../components/dashboard/StatsCard/Stats";
import ProfileCard from "../../components/dashboard/ProfileCard";
import SkillsCard from "../../components/dashboard/SkillsCard";
import RecentlyProject from "../../components/dashboard/RecentlyProject";
import LatestUpdates from "../../components/dashboard/LatestUpdates";
import ProjectState from "../../components/dashboard/ProjectStateCard/ProjectState";
import FeaturesProject from"../../components/dashboard/FeaturesProject";

function Dashboard() {
  return (
  <Page>
    <Welcome/>
    <RowBetween>
      <RoleBalance/>
      <Stats/>
    </RowBetween>
     <DashboardGrid>
      <SideCol $gap={4}>
          <FeaturesProject grow />
          <ProjectState/>
        </SideCol>

        <MainCol $pair>
          <ProfileCard />
          <SkillsCard />
        </MainCol>

        <MainCol>
           <RecentlyProject />
           <LatestUpdates />
        </MainCol>

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
/* 1·2열: 박스는 사라지고 카드들이 DashboardGrid의 칸이 된다(전 구간).
   → 같은 행끼리 높이를 공유한다 (Profile↔Recently, Skills↔Latest)
   박스가 없으니 gap도 없다 — 카드 간격은 DashboardGrid의 gap이 만든다 */
const MainCol = styled.div`
  display: contents;

  /* $pair를 받은 묶음만 모바일에서 박스를 되찾아 2칸으로 나눈다.
     나머지는 계속 display:contents라 카드가 한 줄씩 차지.
     ⚠ :first-child는 DOM 순서를 바꾸면 조용히 깨지므로 prop으로 표시한다 */
  ${media.maxSm} {
    ${({ $pair }) =>
      $pair &&
      `display: grid;
       grid-template-columns: 1fr 1fr;
       gap: var(--spacing-4);
       align-items: start;`}
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  /* 1열 = Side(Features) · 2열 = Profile·Skills · 3열 = Recently·Latest */
  grid-template-columns: 1.4fr 1fr 1.5fr;
  /* 2·3열의 카드들이 공유하는 행.
     ⚠ 한 열의 카드 개수를 바꾸면 이 숫자도 같이 바꿀 것
        (넘치면 행이 아니라 '열'이 새로 생겨서 레이아웃이 깨진다) */
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;          /* 세로로 먼저 채움 */
  gap: var(--spacing-4);
  flex:1;

  ${media.maxLg} {
    grid-template-columns: 3.5fr 6.5fr;   /* 태블릿: 2열(3:7) */
    grid-template-rows:  repeat(3, auto);/* 카드 2행 + Side 1행 */
    grid-auto-flow: column;
  }

  ${media.maxSm} {
    grid-template-columns: 1fr ;     /* 모바일: 1열 */
    grid-template-rows: auto;
     grid-auto-flow: row; /*1열에선 위에서 아래로 */
    
  }
`;


/* 1열: 행에 끼지 않고 2행 전체를 혼자 차지 (기준 높이 담당) */
const SideCol = styled(Column)`
  grid-column: 1;
  grid-row: 1 / -1;

  ${media.maxLg} {
    grid-column: 1 / -1;   /* 2열 아래에 가로로 꽉 차게 */
    grid-row: 3;/* 카드 2행 아래 */
  }
  ${media.maxSm}{
      grid-row: auto;        /* 1열에선 그냥 맨 아래로 */
  }
`;
