// 반응형 기준점을 한 곳에서 관리하는 파일

export const breakpoint = {
  mobile: "360px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1440px",
};

export const media = {
  mobile: `@media (max-width: ${breakpoint.tablet})`,
  tablet: `@media (max-width: ${breakpoint.desktop})`,
  desktop: `@media (min-width: ${breakpoint.desktop})`,
  wide: `@media (min-width: ${breakpoint.wide})`,
};