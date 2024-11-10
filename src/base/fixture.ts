import BrowserstackService from "../browserstack/bstack.service";
import * as base from "@playwright/test";
import { expect } from "@playwright/test";
import { isBstack } from "../utils/env";
import { CommonFunctions } from "../page/common/funtions";
import { CommonLocators } from "../page/common/locators";
import * as BrowserStackLocal from "browserstack-local";

const bsLocal = new BrowserStackLocal.Local();
const BS_LOCAL_ARGS = {
    key: process.env.BROWSERSTACK_ACCESS_KEY || "YOUR_ACCESS_KEY",
    forceLocal: "true",
    force: "true",
    verbose: true,
    onlyAutomate: true,
  };
  export const Browserstack = new BrowserstackService();
export type myPages = {
    commonLoc: CommonLocators;
    commonfunctions: CommonFunctions;
   
};

const test = base.test.extend<myPages>({
    browser: async ({ playwright }, use, testInfo) => {
        if (isBstack) {
          Browserstack.setBstackBuildCaps(testInfo.project);
          const bstackBrowser = await Browserstack.startBrowser(playwright);
          await use(bstackBrowser);
          await bstackBrowser.close();
        } else {
          const localBrowser =
            await playwright[testInfo.project.use.browserName!].launch();
          await use(localBrowser);
        }
      },
      page: async ({ browser }, use, testInfo) => {
        if (isBstack) {
          const bstackPage = await browser.newPage(testInfo.project.use);
          await Browserstack.setSessionName(bstackPage, testInfo);
          await Browserstack.annotateTest(bstackPage, testInfo);
          await use(bstackPage);
          await Browserstack.setTestResult(bstackPage, testInfo);
          await bstackPage.close();
        } else {
          const page = await browser.newPage();
          await use(page);
        }
      },
commonLoc: async ({ page }, use) => {
    await use(new CommonLocators(page));
  },

  commonfunctions: async ({ page }, use) => {
    await use(new CommonFunctions(page));
  },
});
export { test, expect, bsLocal, BS_LOCAL_ARGS };