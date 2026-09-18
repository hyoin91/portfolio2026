export const ROLE_LABELS={
  frontend: "Front-end",
  design: "UI Design",
  publishing: "Publishing",
}
export const projects = [
  {
    id: "goodsobi",
    name: "굿소비",
    summary: "최저가알림서비스",
    roles: ["frontend", "publishing", "design"],
    year: "2025",
    period: "2025.03 - 2025.06",
    description:
      "상품의 최저가 알림과 찜 관리를 제공하는 React 기반 소비 관리 서비스입니다.",
    stack: ["React", "styled-components", "Vite"],
    features: [
      { title: "최저가 알림 설정", desc: "가격 조건 지정 후 알림 수신", icon: "alert" },
      { title: "드래그 앤 드롭 폴더", desc: "DnD 기반 찜 상품 정리", icon: "organize" },
      { title: "찜 상품 관리", desc: "저장·삭제·Undo 지원", icon: "save" },
      { title: "최근 검색어 저장", desc: "localStorage 기반 검색 이력", icon: "search" },
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
    year: "2023",
    period: "2023",
    description: "예술의전당 웹사이트 전면 리뉴얼 퍼블리싱을 담당했습니다.",
    stack: ["HTML", "CSS", "jQuery"],
    features: [],
    updates: [],
  },
  {
    id: "museum",
    name: "박물관문화재단",
    summary: "리뉴얼/웹접근성",
    roles: ["publishing"],
    year: "2023",
    period: "2023",
    description: "웹접근성 인증 기준을 충족하도록 마크업을 재구성했습니다.",
    stack: ["HTML", "CSS"],
    features: [],
    updates: [],
  },
  {
    id: "ice",
    name: "인천시교육청",
    summary: "리뉴얼",
    roles: ["publishing"],
    year: "2023",
    period: "2023",
    description: "인천시교육청 웹사이트 리뉴얼 퍼블리싱을 담당했습니다.",
    stack: ["HTML", "CSS"],
    features: [],
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