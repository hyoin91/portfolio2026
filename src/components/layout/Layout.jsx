 import styled, { css } from "styled-components";

 const flexBase = css`
    display: flex;
    ${(props)=>
        props.$gap != null && `gap:var(--spacing-${props.$gap});`}
 `;

/* 기본 Row */
export const Row = styled.div`
  ${flexBase}
`;

/* 기본 Column */
export const Column = styled.div`
  ${flexBase}
  flex-direction: column;
`;

/* 좌우 정렬 */
export const RowBetween = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

/* 가운데 정렬 */
export const RowCenter = styled(Row)`
  justify-content: center;
  align-items: center;
`;

/* 세로 가운데 */
export const ColumnCenter = styled(Column)`
  justify-content: center;
  align-items: center;
`;

/* Flex Wrap */
export const Wrap = styled(Row)`
  flex-wrap: wrap;
`;
