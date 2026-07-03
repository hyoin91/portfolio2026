import styled from "styled-components";
import typography from "../../styles/typography";

const StyledText = styled.span`
  font-size: ${({ $size }) => typography[$size].fontSize};
  font-weight: ${({ $size, $bold }) =>
    $bold ? "var(--font-weights-bold)" : typography[$size].fontWeight};
  line-height: ${({ $size }) => typography[$size].lineHeight};
  ${({ $size }) =>
    typography[$size].letterSpacing &&
    `letter-spacing: ${typography[$size].letterSpacing};`}
  color: ${({ $color }) => `var(--color-${$color})`};

  @media (max-width: 768px) {
    ${({ $size, $bold }) => {
      const r = typography[$size].responsive;
      if (!r) return "";
      return `
        font-size: ${r.fontSize};
        font-weight: ${$bold ? "var(--font-weights-bold)" : r.fontWeight};
      `;
    }}
  }
`;

function Text({
  as = "span",
  size = "body",
  color = "text-primary",
  bold = false,
  children,
  ...rest
}) {
  return (
    <StyledText as={as} $size={size} $color={color} $bold={bold} {...rest}>
      {children}
    </StyledText>
  );
}

export default Text;