import styled from "styled-components";


function Badge({
     variant = "default",
     children, 
     ...rest
}){
     <StyledBadge 
        $variant={variant} 
        {...rest}
    >
      {children}
    </StyledBadge>
}

export default Badge;



//---------------------styled----------------//

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${({ $variant }) => `var(--component-badge-${$variant}-background)`};
  color: ${({ $variant }) => `var(--component-badge-${$variant}-text)`};
  border-radius: var(--component-badge-radius);
  padding: var(--component-badge-padding-y) var(--component-badge-padding-x);
  font-size: var(--font-sizes-10);
  font-weight: var(--font-weights-medium);
  line-height: 1;
  white-space: nowrap;
`;
