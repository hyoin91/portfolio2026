import styled from "styled-components";
import Text from "../../ui/Text";
import {Row, Column} from "../../layout/Layout"
import {media} from "../../../styles/media"

function RoleBar({roles}){

    return(
       
            <Row>
                {roles.map((role)=>(
                   <Bar
                        $gap={2}
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
                                    
                                    color="text-inverse"
                                >
                                    {role.percent}        
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
 flex: 0 0 ${(props) => props.$percent}%;
`;

const Segment = styled(Row)`
  background: var(--color-${(props) => props.$color});
  height:2.8rem;
  align-items: center;
  padding: var(--component-card-default-padding);
  border-radius:100px;
  ${media.maxMd}{
    height:2.7rem;
  }
`;