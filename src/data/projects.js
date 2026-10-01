/* 이미지는 문자열 경로가 아니라 import로 가져온다 — Vite가 해시 붙은 실제 경로로 바꿔준다 */
import ddoksobi from "../assets/images/project/ddoksobi.svg";

export const ROLE_LABELS={
  frontend: "Front",
  design: "Design",
  publishing: "Publishing",
}
export const projects = [
  {
    id: "goodsobi",
    name: "굿소비",
    summary: "최저가알림서비스",
    roles: ["frontend", "publishing", "design"],
    /* 역할별 기여도(%) — 숫자로 저장하고 화면에서 "%"를 붙인다.
       키는 roles와 같은 소문자 코드여야 ROLE_LABELS가 맞물린다 */
    contribution: { frontend: 100, publishing: 100, design: 100 },
    year: "2025",
    period: "2025.03 - 2025.06",
    description:
      "상품의 최저가 알림과 찜 관리를 제공하는 React 기반 소비 관리 서비스입니다.",
    stack: ["React", "styled-components", "Vite"],
    /* Overview에 걸리는 대표 이미지. 없으면 Overview가 글만 나온다 */
    cover: ddoksobi,
    coverAlt: "굿소비 앱 메인 화면",
    /* desc = 대시보드용 한 줄 / detailDesc = 상세 페이지용 긴 설명(없으면 desc로 대체) */
    features: [
      {
        title: "최저가 알림 설정",
        desc: "가격 조건 지정 후 알림 수신",
        detailDesc:
          "사용자가 설정한 목표 가격과 실제 최저가를 비교 감지하여 조건 만족 시 실시간 알림을 제공하고, 알림 상태 관리 및 조건 수정을 직관적으로 처리할 수 있도록 구현했습니다.",
        icon: "alert",
      },
      {
        title: "드래그 앤 드롭 폴더",
        desc: "DnD 기반 찜 상품 정리",
        /* TODO(임시) */
        detailDesc:
          "찜한 상품을 폴더 단위로 묶고 드래그 앤 드롭으로 순서와 소속 폴더를 바꿀 수 있도록 구현했습니다. 끌고 가는 동안 놓일 위치를 미리 표시해 사용자가 결과를 예측한 상태에서 놓을 수 있게 했습니다.",
        icon: "organize",
      },
      {
        title: "찜 상품 관리",
        desc: "저장·삭제·Undo 지원",
        /* TODO(임시) */
        detailDesc:
          "상품 저장과 삭제를 한 번의 동작으로 처리하고, 삭제 직후 Toast에 Undo 버튼을 함께 띄워 실수로 지운 상품을 즉시 되돌릴 수 있도록 했습니다.",
        icon: "save",
      },
      {
        title: "최근 검색어 저장",
        desc: "localStorage 기반 검색 이력",
        /* TODO(임시) */
        detailDesc:
          "검색어를 localStorage에 저장해 재방문 시에도 이력이 유지되도록 하고, 이미 있는 검색어는 최신 항목으로 끌어올려 목록이 불필요하게 길어지지 않도록 처리했습니다.",
        icon: "search",
      },
    ],
    designPoints: [
      "반복되는 스타일 최소화를 위한 styled-components ThemeProvider 및 디자인 토큰 구축",
      "사용자 실수를 방지하기 위한 Toast 메시지 내 Undo 버튼 제공 등 UX 디테일 구현",
    ],
    updates: [
      { id: "gs-1", title: "드래그 앤 드롭 폴더", date: "26.05" },
      { id: "gs-2", title: "최근 검색어 저장",     date: "26.05" },
      { id: "gs-3", title: "최저가 알림 설정",     date: "26.05" },
      { id: "gs-4", title: "프로필 편집",    date: "26.05" },
    ],
  },
  {
    id: "sac",
    name: "예술의전당",
    summary: "리뉴얼",
    roles: ["publishing"],
    contribution: { publishing: 100 },
    year: "2023",
    period: "2023",
    description: "예술의전당 웹사이트 전면 리뉴얼 퍼블리싱을 담당했습니다.",
    stack: ["HTML", "CSS", "jQuery"],
    features: [],
    designPoints: [],
    updates: [],
  },
  {
    id: "museum",
    name: "박물관문화재단",
    summary: "리뉴얼/웹접근성",
    roles: ["publishing"],
    contribution: { publishing: 100 },
    year: "2023",
    period: "2023",
    description: "웹접근성 인증 기준을 충족하도록 마크업을 재구성했습니다.",
    stack: ["HTML", "CSS"],
    features: [],
    designPoints: [],
    updates: [],
  },
  {
    id: "ice",
    name: "인천시교육청",
    summary: "리뉴얼",
    roles: ["publishing"],
    contribution: { publishing: 100 },
    year: "2023",
    period: "2023",
    description: "인천시교육청 웹사이트 리뉴얼 퍼블리싱을 담당했습니다.",
    stack: ["HTML", "CSS"],
    features: [],
    designPoints: [],
    updates: [],
  },
];

/* id로 하나 찾기 — ProjectDetail이 사용 */
export function getProject(id){
    return projects.find((project)=> project.id === id);
}
/* 최근 프로젝트 N개 — RecentlyProject가 사용 */
export function getRecentProjects (count = 4){
    return projects.slice( 0, count);
}
/* 모든 프로젝트의 업데이트를 한 줄 목록으로 펼치기 — LatestUpdates가 사용 */
export function getLatestUpdates(count = 4) {
  return projects
    .flatMap((project) =>
      project.updates.map((update) => ({
        ...update,
        projectId: project.id,
        projectName: project.name,
      }))
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}
/* 역할별 프로젝트 개수 — ProjectState가 사용 */
export function getRoleStats(){
  const counts={};

  projects.forEach((project)=>{
    project.roles.forEach((role)=>{
      counts[role] = (counts[role] ?? 0) +1
    });
  });
  return counts;
}
