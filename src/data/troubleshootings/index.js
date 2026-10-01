/* 트러블슈팅 본문은 프로젝트당 파일 하나.
   projects.js에 두면 길이가 수백 줄이라 프로젝트 메타데이터가 묻힌다.
   새 프로젝트를 추가하려면 파일을 만들고 아래 byProject에 한 줄만 더 넣으면 된다. */
import goodsobi from "./goodsobi.js";

const byProject = {
  goodsobi,
};

/* 프로젝트 하나의 목록 — ProjectDetail이 사용. 없는 프로젝트면 빈 배열 */
export function getTroubleshootings(projectId) {
  return byProject[projectId] ?? [];
}

/* 한 건 — TroubleshootingDetail이 사용. 못 찾으면 undefined */
export function getTroubleshooting(projectId, tsId) {
  return getTroubleshootings(projectId).find((item) => item.id === tsId);
}
