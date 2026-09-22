import styled from "styled-components";
import typography from "../../styles/typography";
import { media } from "../../styles/media";

const StyledText = styled.span`
  font-size: ${({ $size }) => typography[$size].fontSize};
  font-weight: ${({ $size, $weight }) =>
    $weight ? `var(--font-weights-${$weight})` 
            : typography[$size].fontWeight};
  ${({ $size }) =>
    typography[$size].letterSpacing &&
    `letter-spacing: ${typography[$size].letterSpacing};`}
  color: ${({ $color }) => `var(--color-${$color})`};

 ${({ $size, $mdScale }) => {
    if ($mdScale == null) return "";
    return `${media.maxMd} {
      font-size: calc(${typography[$size].fontSize} * ${$mdScale});
    }`;
  }}
  
  ${media.maxSm} {
    ${({ $size, $weight }) => {
      const r = typography[$size].responsive;
      if (!r) return "";
      return `
        font-size: ${r.fontSize};
        font-weight: ${$weight ? `var(--font-weights-${$weight})` : r.fontWeight};
      `;
    }}
  }
`;

function Text({
  as = "span",
  size = "body",
  color = "text-primary",
  weight,  
  mdScale,
  children,
  ...rest
}) {
  return (
    <StyledText 
      as={as} 
      $size={size} 
      $color={color} 
      $weight={weight}
      $mdScale={mdScale} 
      {...rest}
      >
      {children}
    </StyledText>
  );
}

export default Text;