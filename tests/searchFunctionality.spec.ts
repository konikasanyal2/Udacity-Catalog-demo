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
    await commonLoc.searchButton.isEnabled();
    await commonLoc.searchButton.click();
    await commonfunctions.enterDetails(commonLoc.searchButton,constant.searchText);
    await commonLoc.searchButton.press('Enter');
    //clicked on skill dropdown
    await page.getByRole('button', { name: 'Skill' }).click();
    await commonLoc.skillInput.click();
    await commonLoc.skillInputField.fill(constant.skillText);
    await page.getByRole('button', { name: constant.skillText }).click();
   
    //----*****-------******------******------*******-----need to execute post api response and validate the api response with ui response ----****----****----****----****
   //creating a POST request
    const postAPIResponse = await request.post('https://api.udacity.com/api/unified-catalog/search',{
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
   const responseJson = await JSON.parse(await postAPIResponse.text());
   // Log the full response in a readable way (with indentation)
let response = await (JSON.stringify(responseJson, null, 2));
console.log(response);
await expect(postAPIResponse.ok()).toBeTruthy();
await expect(postAPIResponse.status()).toBe(200);
let total_article = await commonLoc.article.count();
await console.log(total_article);
   if( total_article == 0){
    await expect(commonLoc.noResult).toHaveText(constant.noResultVerbiage); 
   }
    else {
      for(let i =1; i<=total_article;i++){
        let uiTitle = commonfunctions.fetchSkillTitle(i);
       // Extract the title from the API response
        let apiTitle = responseJson.results[0]?.highlighted?.title?.value;
        console.log('Title received from UI : ',uiTitle);
        console.log('Title received from api : ', apiTitle);
        await expect(uiTitle).toBe(apiTitle);
        console.log('Titles match:', apiTitle === uiTitle);
      }
      
    }
  });
});
