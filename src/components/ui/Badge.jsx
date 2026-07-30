import styled from "styled-components";
import Text from "../ui/Text"


function Badge({
     variant = "default",
     children, 
     ...rest
}){
    return(
    <StyledBadge 
        size="caption"
        $variant={variant} 
        {...rest}
    >
      {children}
    </StyledBadge>
    );
     
}

export default Badge;



//---------------------styled----------------//

const StyledBadge = styled(Text)`
  display: inline-flex;
  align-items: center;
  background: ${({ $variant }) => `var(--component-badge-${$variant}-background)`};
  color: ${({ $variant }) => `var(--component-badge-${$variant}-text)`};
  border-radius: var(--component-badge-radius);
  padding: var(--component-badge-padding-y) var(--component-badge-padding-x);
 
  white-space: nowrap;
`;
