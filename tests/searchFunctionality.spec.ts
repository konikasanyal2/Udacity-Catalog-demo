import { Browserstack, expect, test } from "../src/base/fixture";
import { isBstack } from "../src/utils/env";
import { constant } from "../src/data/constant";
import { type } from "os";

test.describe.configure({ mode: "parallel" });

test.describe("Udacity Catalog > Search Functionality :", () => {
  test.beforeEach(async ({ commonfunctions, page, }) => {
    //Navigate to  udacity catalog page
    await commonfunctions.navigateTo(
      constant.udacltyUrl,
      page,
    );
    if (isBstack) Browserstack.logSessionDetails(page);
  });

  test.afterEach(async ({ page, }) => {

    await page.close();
  });

  test(" Scenario : Perform search functionality for skills using POST api response @successsearch", async ({
    commonfunctions,
    commonLoc,
    page,
    request,
  }) => {
    await page.waitForLoadState();
    //waiting for catalog page to load successfully
    await expect(commonLoc.udacitylogo).toBeVisible();
    //checked for search element on the top header and searched "Testing"
    await commonLoc.searchButton.waitFor({state: 'visible'});
    await expect(commonLoc.searchButton).toBeEnabled();
    await commonLoc.searchButton.click();
    await commonfunctions.enterDetails(commonLoc.searchInputBox, constant.searchText);
    await commonLoc.searchInputBox.press('Enter');
    await expect(commonLoc.serchResultheading).toBeVisible();

    //clicked on skill dropdown
    await page.getByRole('button', { name: 'Skill' }).click();
    await  commonLoc.skillInput.waitFor({state:'visible'});
    await commonLoc.skillInput.click();
    await  commonLoc.skillInputField.waitFor({state:'visible'});
    await commonLoc.skillInputField.fill(constant.skillText);
    await page.getByRole('button', { name: constant.skillText }).waitFor({state:'visible'});
    await page.getByRole('button', { name: constant.skillText }).click();

    //----*****-------******------******------*******-----need to execute post api response and validate the api response with ui response ----****----****----****----****
    //creating a POST request
    const postAPIResponse = await request.post('https://api.udacity.com/api/unified-catalog/search', {
      data: {
        difficulties: [],
        durations: [],
        enrolledOnly: false,
        keys: [],
        page: 0,
        pageSize: 24,
        schools: [],
        searchText: "Testing",
        semanticTypes: [],
        skills: ["taxonomy:4c61e76f-1bc5-4088-97ee-9e4756fafece"],
        sortBy: "relevance"
      },
      headers: {
        'content-type' : 'application/json',
     }
    });
    const responseJson = JSON.parse((await postAPIResponse.body()).toString());
    // Log the full response in a readable way (with indentation)
    await expect(postAPIResponse.ok()).toBeTruthy();
    await expect(postAPIResponse.status()).toBe(200);
    await expect(commonLoc.article.first()).toBeVisible();
    let total_article = await (await commonLoc.article.all()).length
    if (total_article == 0) {
      await expect(commonLoc.noResult).toHaveText(constant.noResultVerbiage);
    }
    else {
      var apiTitle: string[];
      apiTitle = [];  
      var UiTitle: string[];
      UiTitle = [];  
      for (let i = 1; i <= total_article; i++) {
        UiTitle.push(await commonfunctions.fetchSkillTitle(i));
      }
      for (let i = 0; i < total_article; i++) {
        // Extract the title from the API response
        apiTitle.push(await responseJson.searchResult.hits[i].title.toString());
      }
      await expect(commonfunctions.compareArrays(apiTitle,UiTitle)).toBeTruthy();
    }
  });
});
