// 반응형 기준점을 한 곳에서 관리하는 파일.
// 이름은 기기가 아니라 크기 순서(sm < md < lg < xl)로 짓는다 —
// max/min 접두사가 방향을 말해주므로 쓰는 쪽에서 헷갈릴 일이 없다.
//
// max-width는 겹친다: 900px 화면에선 maxMd와 maxLg가 둘 다 켜진다.
// 같은 속성을 건드리면 나중에 쓴 쪽이 이기므로,
// 컴포넌트에서는 항상 큰 값 -> 작은 값 순으로 적을 것.

export const breakpoint = {
  sm: "860px",
  md: "1000px",
  lg: "1260px",
  xl: "1440px",
};

export const media = {
  maxSm: `@media (max-width: ${breakpoint.sm})`, /* ~768  : 대시보드 1열 */
  maxMd: `@media (max-width: ${breakpoint.md})`, /* ~1000 : 아직 미사용 */
  maxLg: `@media (max-width: ${breakpoint.lg})`, /* ~1260 : 대시보드 3열 -> 2열 */
  minXl: `@media (min-width: ${breakpoint.xl})`, /* 1440~ : 아직 미사용 */
};
