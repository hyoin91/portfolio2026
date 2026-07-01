import { createGlobalStyle } from "styled-components";
import "./tokens.css";
import "./reset.css";

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--color-background-page);
    color: var(--color-text-primary);
    font-family: Pretendard, Inter, Arial, sans-serif;
    transition:
      background-color var(--motion-normal),
      color var(--motion-normal);
  }

  ::selection {
    background: var(--color-brand-soft);
    color: var(--color-text-primary);
  }
`;

export default GlobalStyle;