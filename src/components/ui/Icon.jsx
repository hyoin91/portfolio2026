import styled from "styled-components";

const StyledIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => `var(--sizing-icon-${$size})`};
  height: ${({ $size }) => `var(--sizing-icon-${$size})`};

  svg,
  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  svg {
    color: ${({ $color }) => `var(--color-${$color})`};
    stroke: currentColor;
  }
`;

function Icon({ component: Component, src, size = "md", alt = "", color = "text-primary", ...rest }) {
  return (
    <StyledIcon $size={size} $color={color} {...rest}>
      {Component && <Component stroke="currentColor" />}
      {src && <img src={src} alt={alt} />}
    </StyledIcon>
  );
}

export default Icon;
