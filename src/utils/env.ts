import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config({ silent: true });

export const isBstack = process.env.PWBSTACK === "true";
export const isBstackLocal = process.env.BROWSERSTACK_LOCAL === "true";

export const VIEWPORTS = {
  desktop: { width: 1680, height: 1280 },
  anyScreen: null,
};
