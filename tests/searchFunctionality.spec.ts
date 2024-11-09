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

  test("Positive scenario : Perform search functionality for skills using POST api response @successsearch", async ({
    commonfunctions,
    commonLoc,
    page,
    request,
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
    await commonLoc.skillInputField.click();
    //Search functionality for skill search is not working ----********-----********-------****
    await page.getByLabel('AUtomation Testing').click();
    //----*****-------******------******------*******-----need to execute post api response and validate the api response with ui response ----****----****----****----****
   //creating a POST request
    const postAPIResponse = await request.post('/search',{
    data :{
      difficulties : [],
durations : [],
enrolledOnly : false,
keys : [],
page : 0,
pageSize : 24,
schools : [],
searchText: "Testing",
semanticTypes: [],
skills: ["taxonomy:4c61e76f-1bc5-4088-97ee-9e4756fafece"],
sortBy: "relevance"
    },
   })
const postAPIResponseBody = await postAPIResponse.json();
console.log(postAPIResponseBody);
await expect(postAPIResponse.ok()).toBeTruthy();
await expect(postAPIResponse.status()).toBe(200);

   
    
  });
});
