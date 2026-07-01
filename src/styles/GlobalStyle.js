import { createGlobalStyle } from "styled-components";
import "./tokens.css";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  body {
    margin: 0;
    background: var(--color-background-page);
    color: var(--color-text-primary);
    font-family: Pretendard, Inter, Arial, sans-serif;
    transition:
      background-color var(--motion-normal),
      color var(--motion-normal);
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button {
    border: 0;
    background: none;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;