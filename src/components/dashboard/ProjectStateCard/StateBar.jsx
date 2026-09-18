import styled from "styled-components";
import Text from "../../ui/Text";
import { Row, Column } from "../../layout/Layout";

function StateBar({roles,total}){
    return(
        <Row $gap={1}>
            {roles.map((role)=>(
                <Bar
                    key={role.role}
                    $gap={1}
                    $percent={total ? 
                        (role.count / total) *100 
                        : 0
                    }
                >
                  <Text as="span" size="caption" color="text-secondary">
                    {role.label}
                  </Text>
                  <Segment $color={role.color}>
                     <Text as="span" size="body" color="text-inverse">
                         {role.count}
                    </Text>
                  </Segment>
                </Bar>
            ))}
        </Row>
    );
}

export default StateBar;


//---------------------styled----------------//

const Bar = styled(Column)`
  flex: 1 1 ${({ $percent }) => $percent}%;
  min-width: 0;
`;

const Segment = styled(Row)`
  align-items: center;
  justify-content: center;
  background: var(--color-${({ $color }) => $color});
  height: 3.5rem;
  border-radius: var(--border-radius-pill);
`;
