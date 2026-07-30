import styled from "styled-components";
import typography from "../../styles/typography";

const StyledText = styled.span`
  font-size: ${({ $size }) => typography[$size].fontSize};
  font-weight: ${({ $size, $weight }) =>
    $weight ? `var(--font-weights-${$weight})` 
            : typography[$size].fontWeight};
  line-height: ${({ $size }) => typography[$size].lineHeight};
  ${({ $size }) =>
    typography[$size].letterSpacing &&
    `letter-spacing: ${typography[$size].letterSpacing};`}
  color: ${({ $color }) => `var(--color-${$color})`};

  @media (max-width: 768px) {
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
  children,
  ...rest
}) {
  return (
    <StyledText as={as} $size={size} $color={color} $weight={weight} {...rest}>
      {children}
    </StyledText>
  );
}

export default Text;