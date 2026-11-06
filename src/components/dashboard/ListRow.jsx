import styled from "styled-components";
import { Link } from "react-router-dom";
import Text from "../ui/Text";
import Badge from "../ui/Badge";

function ListRow({
   to,
   logo,
   name,
   desc, 
   badge, 
   badgeVariant = "default", 
   meta,
   highlight = false   // 맨 위(가장 최신) 줄 강조 — 옅은 파란 배경
}){
    return(
        <ListRowWrap to={to} $highlight={highlight}>
            {/* 프로젝트 로고. 없으면 색 네모로 자리만 잡는다(이름 줄이 어긋나지 않게) */}
            {/* 로고 + 이름을 한 덩어리로 — 바깥 gap(12px) 대신 안쪽 gap(4px)만 받는다 */}
            <NameCell>
                {logo ? <Logo src={logo} alt="" /> : <Dot/>}
                <Name size="body">
                    {name}
                </Name>
            </NameCell>
            <Desc size="body" >
                {desc}
            </Desc>
            {badge && 
                <Badge variant={badgeVariant}>
                    {badge}
                </Badge>}
            <Text size="text">
                {meta}
            </Text>
        </ListRowWrap>
    );
}
export default ListRow;


//---------------------styled----------------//
const ListRowWrap = styled(Link)`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--component-link-listlink-padding-y) var(--spacing-3);
  border-radius: var(--component-link-listlink-radius);
  /* 평소에도 투명 테두리로 자리를 잡아 둔다 — 없다가 생기면 줄이 1px 커지며 아래가 밀린다 */
  border: 1px solid transparent;
  transition: border-color var(--motion-fast), background var(--motion-fast);
  background: ${({ $highlight }) =>
    $highlight
      ? "var(--component-link-listlink-background-highlight)"
      : "var(--component-link-listlink-background)"};

  /* 배경은 «최신», 테두리는 «누를 수 있다» — 두 신호를 섞지 않는다.
     키보드(Tab) 이동에도 같은 표시가 나오게 focus-visible을 함께 건다 */
  &:hover,
  &:focus-visible {
    border-color: var(--component-link-listlink-border-hover);
    outline: none;
  }
`;

const Dot = styled.span`
  flex: 0 0 auto;
  width: var(--sizing-icon-sm);
  height: var(--sizing-icon-sm);
  border-radius: var(--border-radius-xs);
  background: var(--color-surface-placeholder);   /* 로고 없는 프로젝트의 빈 자리 — 회색이라 튀지 않는다 */
`;

const Logo = styled.img`
  flex: 0 0 auto;
  width: var(--sizing-icon-sm);
  height: var(--sizing-icon-sm);
  border-radius: var(--border-radius-xs);
  object-fit: cover;
`;

/* 덩어리 전체를 고정폭으로 — 모든 행의 설명 시작 위치가 맞는다.
   폭 = 로고 16px + 간격 4px + 가장 긴 이름(박물관문화재단) 109px */
const NameCell = styled.span`
  flex: 0 0 calc(var(--sizing-icon-sm) + var(--spacing-1) + 109px);
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  min-width: 0;
`;

const Name = styled(Text)`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Desc = styled(Text)`
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
   text-overflow: ellipsis;
`;