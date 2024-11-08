import { Browserstack, expect, test } from "../src/base/fixture";
import { isBstack } from "../src/utils/env";
import { constant } from "../src/data/constant";

test.describe.configure({ mode: "parallel" });

test.describe("Udacity Catalog > Search Functionality :", () => {
  test.beforeEach(async ({ commonfunctions, page,  }) => {
    //Navigate to  udacity catalog page
    await commonfunctions.navigateTo(
      constant.udacltyUrl,
      page,
    );
    if (isBstack) Browserstack.logSessionDetails(page);
  });

  test.afterEach(async ({ page,  }) => {
   
    await page.close();
  });

  test("Positive scenario : Perform search functionality for skills  @successsearch", async ({
    commonfunctions,
    commonLoc,
    page,
  }) => {
    await page.waitForLoadState();
    //waiting for catalog page to load successfully
    await expect(commonLoc.udacitylogo).toBeVisible();
    //checked for search element on the top and searched "Testing"
    await commonLoc.searchButton.isEnabled();
    await commonLoc.searchButton.click();
    await commonfunctions.enterDetails(commonLoc.searchButton,constant.searchText);
    await commonLoc.searchButton.press('Enter');
    //clicked on skill dropdown
    await page.getByRole('button', { name: 'Skill' }).click();
    await commonLoc.skillInputField.fill(constant.skillText);
    // (await commonfunctions.locateByRegionRole(constant.regionRole)).hover();
    
    await page.pause();
    
  });
});
