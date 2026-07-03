
import buildCssTokens from "./build-css.js";
import buildTheme from "./build-theme.js";

function buildTokens() {
  console.log("Building design tokens...\n");

  buildCssTokens();
  buildTheme();

  console.log("\nDesign token build completed.");
}

buildTokens();
