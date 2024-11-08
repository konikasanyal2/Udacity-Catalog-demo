import { browsers } from "../../src/browserstack/bstack.caps";
import * as util from "../../src/utils/helper";

export default class BstackService {
  public caps: NonNullable<unknown>;

  public setBstackBuildCaps(project) {
    const dateTime: Date = new Date();
    const buildName = "VP-FE-builds " + dateTime.toDateString();
    this.caps = browsers[project.name];
    this.caps["build"] = process.env.BROWSERSTACK_BUILD || buildName;
    this.caps["browserstack.local"] = process.env.BROWSERSTACK_LOCAL || false;
  }

  public async startBrowser(playwright) {
    return await playwright.chromium.connect({
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
        JSON.stringify(this.caps),
      )}`,
    });
  }

  public async setTestResult(page, testInfo) {
    const testResult = {
      action: "setSessionStatus",
      arguments: {
        status: util.evaluateSessionStatus(testInfo.status),
        reason: util.nestedKeyValue(testInfo, ["error", "message"]),
      },
    };
    await page.evaluate(
      () => {},
      `browserstack_executor: ${JSON.stringify(testResult)}`,
    );
  }

  public async setSessionName(page, testInfo) {
    const sessionName = {
      action: "setSessionName",
      arguments: {
        name: testInfo.titlePath.slice(0, -1).join(" - "),
      },
    };
    await page.evaluate(
      () => {},
      `browserstack_executor: ${JSON.stringify(sessionName)}`,
    );
  }

  public async getSessionDetails(page) {
    return await page.evaluate(
      () => {},
      'browserstack_executor: {"action": "getSessionDetails"}',
    );
  }

  public async logSessionDetails(page) {
    const resp = await JSON.parse(
      await page.evaluate(
        () => {},
        `browserstack_executor: ${JSON.stringify({
          action: "getSessionDetails",
        })}`,
      ),
    );
    console.log(resp);
  }

  public async annotateTest(page, testInfo) {
    const annotation = "TEST: " + testInfo.titlePath.join(" - ");

    this.annotate(page, annotation, "info");
  }

  public async annotate(page, annotation, level) {
    const sessionName = {
      action: "annotate",
      arguments: {
        data: annotation,
        level: level,
      },
    };
    await page.evaluate(
      () => {},
      `browserstack_executor: ${JSON.stringify(sessionName)}`,
    );
  }
}
