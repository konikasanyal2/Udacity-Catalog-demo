import { PlaywrightTestConfig } from "@playwright/test";
import { VIEWPORTS } from "./src/utils/env";
import * as dotenvFlow from "dotenv-flow";
dotenvFlow.config({ silent: true });

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./src/global/global-setup"),
  globalTeardown: require.resolve("./src/global/gloval-teardown"),
  testMatch: "/*.spec.ts",
  timeout: 120 * 1000,
  expect: {
    timeout: 18 * 1000,
  },
  reporter: [["html", { open: "never" }]],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "https://api.udacity.com/api/unified-catalog/",
    actionTimeout: 0,
    navigationTimeout: 60 * 1000,
    headless: false,
    trace: "on",
    screenshot: "only-on-failure",
    acceptDownloads: true,
  },
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        channel: "chrome",
        ignoreHTTPSErrors: true,
        viewport: VIEWPORTS.anyScreen,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        ignoreHTTPSErrors: true,
        viewport: VIEWPORTS.anyScreen,
      },
    },
    {
      name: "safari",
      use: {
        browserName: "webkit",
        ignoreHTTPSErrors: true,
        viewport: VIEWPORTS.anyScreen,
      },
    },
    {
      name: "edge",
      use: {
        browserName: "chromium",
        channel: "msedge",
        ignoreHTTPSErrors: true,
        viewport: VIEWPORTS.anyScreen,
      },
    },
  ],
};

export default config;
