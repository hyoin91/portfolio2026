const buildCssTokens = require("./build-css");
const buildTheme = require("./build-theme");

function buildTokens() {
  console.log("Building design tokens...\n");

  buildCssTokens();
  buildTheme();

  console.log("\nDesign token build completed.");
}

buildTokens();