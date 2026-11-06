/* 이미지는 문자열 경로가 아니라 import로 가져온다 — Vite가 해시 붙은 실제 경로로 바꿔준다 */
import ddoksobi from "../assets/images/project/ddoksobi.svg";
import ddoksobiLogo from "../assets/images/project/ddoksobi-logo.png";
import sacLogo from "../assets/images/project/seoulartcenter_logo.svg";
import { getTroubleshootings } from "./troubleshootings/index.js";

export const ROLE_LABELS={
  frontend: "Front",
  design: "Design",
  publishing: "Publishing",
}
export const projects = [
  {
    id: "goodsobi",
    name: "굿소비",
    summary: "최저가 알림 서비스",
    roles: ["frontend", "publishing", "design"],
    /* 역할별 기여도(%) — 숫자로 저장하고 화면에서 "%"를 붙인다.
       키는 roles와 같은 소문자 코드여야 ROLE_LABELS가 맞물린다 */
    contribution: { frontend: 100, publishing: 100, design: 100 },
    year: "2025",
    period: "2025.03 - 2025.06",
    description:
      "상품의 최저가 알림과 찜 관리를 제공하는 React 기반 소비 관리 서비스입니다.",
    /* 상세 개요에만 덧붙는 문장 — description은 메인 Featured Project 카드와 같이 쓰므로 짧게 유지 */
    overviewNote:
      "앱이 웹을 WebView로 띄우는 하이브리드 구조의 2인 프로젝트로, 웹의 디자인부터 프론트엔드 개발까지 맡았습니다.",
    stack: ["React", "styled-components", "Vite", "Design Tokens"],
    /* 개요에 나란히 놓이는 모바일 화면(세로 캡처 원본 그대로, 3장 권장).
       caption = 화면 아래 짧은 이름. 비어 있으면 개요가 글만 나온다 */
    /* 개요 오른쪽 QR. null이면 «QR 준비 중» 자리만 잡고, 키가 아예 없으면 안 나온다.
       준비되면 이미지를 import해서 qr: ddoksobiQr 처럼 넣는다 */
    qr: null,
    qrCaption: "모바일에서 열기",
    screens: [
      { src: ddoksobi, caption: "메인", alt: "굿소비 메인 화면" },               // 임시 — 실제 캡처로 교체
      { src: ddoksobi, caption: "가격 그래프", alt: "굿소비 상품 상세 가격 그래프 화면" }, // 임시
      { src: ddoksobi, caption: "찜 폴더", alt: "굿소비 찜 폴더 정리 화면" },        // 임시
    ],
    /* 목록(Latest Updates·Recently Project) 앞에 붙는 작은 로고. 없으면 색 네모 */
    logo: ddoksobiLogo,
    /* title = 대시보드·상세 공통 제목
       summary = 상세 카드의 한 줄 요약(«뭔지») / points = 구현 포인트 2개(«어떻게», 짧게)
       date = 포트폴리오에 올린 날(YYYY-MM-DD) — Latest Updates 가 이 값으로 정렬한다 */
    features: [
      {
        title: "할인율 조건으로 최저가 알림 받기",
        summary: "상품마다 할인율·재입고·최저가 알림을 켜고 끈다",
        points: ["5% 단위 슬라이더로 할인율 설정", "낙관적 업데이트로 누르는 즉시 반영"],
        icon: "alert",
        date: "2026-10-19",
      },
      {
        title: "드래그 앤 드롭으로 찜 상품 폴더 정리",
        summary: "찜한 상품을 폴더로 묶고 끌어서 정리한다",
        points: ["놓일 위치를 미리 표시", "삭제는 5초 뒤 서버에 반영 — 그 사이 되돌리기(Undo)"],
        icon: "organize",
        date: "2026-10-19",
      },
      {
        title: "기간별 가격 변동 그래프",
        summary: "1·2·3개월 가격 흐름과 최고·평균·최저가를 본다",
        points: ["빈 날짜를 채워 실제 흐름대로 표시", "작은 변동이 과장되지 않게 세로축 보정"],
        icon: "chart",
        date: "2026-10-19",
      },
      {
        title: "공유 링크 · 앱(WebView) 연동",
        summary: "로그인 없이 공유받은 상품의 가격을 본다",
        points: ["앱은 기본 공유창, 브라우저는 링크 복사", "익명 요청으로 불필요한 계정 생성 방지"],
        icon: "share",
        date: "2026-10-19",
      },
    ],
  },
  {
    id: "sac",
    name: "예술의전당",
    logo: sacLogo,
    summary: "리뉴얼",
    roles: ["publishing"],
    contribution: { publishing: 100 },
    year: "2023",
    period: "2023",
    description: "예술의전당 웹사이트 전면 리뉴얼 퍼블리싱을 담당했습니다.",
    stack: ["HTML", "CSS", "jQuery"],
    features: [],
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
/* 최근 올린 것 N개 — LatestUpdates가 사용.
   Key Features 와 트러블슈팅에 붙인 date 를 모아 최신순으로 뽑는다.
   따로 적는 updates 목록을 두지 않는다 — 두 군데 적으면 한쪽만 고쳐진다 */
export function getLatestUpdates(count = 4) {
  return projects
    .flatMap((project) => [
      ...project.features
        .filter((feature) => feature.date)
        .map((feature) => ({
          id: `${project.id}-feature-${feature.title}`,
          type: "Feature",
          variant: "feature",   /* 뱃지 색 — 토큰 component.badge.feature */
          title: feature.title,
          date: feature.date,
          projectName: project.name,
          to: `/projects/${project.id}#key-features`,
          projectLogo: project.logo,
        })),
      ...getTroubleshootings(project.id)
        .filter((item) => item.date)
        .map((item) => ({
          id: `${project.id}-ts-${item.id}`,
          type: "Fix",
          variant: "fix",       /* 뱃지 색 — 토큰 component.badge.fix */
          title: item.title,
          date: item.date,
          projectName: project.name,
          to: `/projects/${project.id}/troubleshooting/${item.id}`,
          projectLogo: project.logo,
        })),
    ])
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
