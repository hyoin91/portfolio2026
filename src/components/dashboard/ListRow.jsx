import styled from "styled-components";
import { Link } from "react-router-dom";
import Text from "../ui/Text";
import Badge from "../ui/Badge";

function ListRow({
   to, 
   name, 
   desc, 
   badge, 
   badgeVariant = "default", 
   meta
}){
    return(
        <ListRowWrap to={to}>
            <Dot/>
            <Name size="body">
                {name}
            </Name>
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
  transition: background var(--motion-fast);
  background: var(--component-link-listlink-background);

  &:hover {
    background: var(--component-link-listlink-background-hover);
  }
`;

const Dot = styled.span`
  flex: 0 0 auto;
  width: var(--sizing-icon-sm);
  height: var(--sizing-icon-sm);
  border-radius: var(--border-radius-xs);
  background: var(--color-brand-soft);
`;

const Name = styled(Text)`
  flex: 0 0 116px;
  min-width: 0;
`;

const Desc = styled(Text)`
  flex: 1;
  min-width: 0;
`;