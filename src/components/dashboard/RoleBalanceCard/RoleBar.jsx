import styled from "styled-components";
import Text from "../../ui/Text";
import { Row, Column } from "../../layout/Layout";

function RoleBar({roles}){

    return(
       
            <Row>
                {roles.map((role)=>(
                   <Bar
                        key={role.label}
                        $percent={role.percent} 
                    >
                        <Text as="span" size="body">
                            {role.label}
                        </Text>
                        <Segment    
                            $color={role.color}
                        >
                                <Text 
                                    as="span" 
                                    size="caption" 
                                    color="text-inverse"
                                >
                                    {role.percent}%
                                </Text>
                        </Segment> 
                   </Bar>
                ))}
            </Row>
       
    );
}

export default RoleBar;


//---------------------styled----------------//

const Bar = styled(Column)`
  gap: var(--spacing-1);
 flex: 0 0 ${(props) => props.$percent}%;
`;

const Segment = styled(Row)`
  background: var(--color-${(props) => props.$color});
  height:3.7rem;
  padding: var(--component-card-default-padding);
  border-radius:100px;
`;