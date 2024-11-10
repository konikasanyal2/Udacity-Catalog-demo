import { type Page, type Locator, expect } from "@playwright/test";
import { CommonLocators } from "./locators";
import { constant } from "../../data/constant";
import { stringify } from "querystring";
import { Stream } from "stream";


export class CommonFunctions {
    private page: Page;
  
    public locators: CommonLocators;
  
    constructor(page: Page) {
      this.page = page;
      this.locators = new CommonLocators(page);
    }
  
   //function to navigate to a url
    async navigateTo(pageURL: string, page: Page) {
      await page.goto(pageURL);
    }
    //function to enter keyword
    async enterDetails(element : Locator, keyword: string){
        await element.clear();
        await element.fill(keyword);
    }
//function to locate element via text
  async locateByText(value: string) {
    return this.page.locator(`//*[contains(text(),"${value}")]`);
  }
  //function to locate skill element via role
  async locateByRegionRole(role: string){
    return this.page.locator('role=region[name="'+role+'"] >> xpath=//*[@id="react-select-select-instance-skill-placeholder"]')
  }
  //function to fetch skill articles title
   async fetchSkillTitle(num : number){
    let element = await this.page.locator('//article[@role="group" and @class="css-1yzvs5q"]['+num+']/div[2]/div/div[2]/a');
    //let element = await this.page.locator('//article[@role="group" and @class="css-1yzvs5q"][1]/div[2]/div/div[2]/a');
    let str = (await element.textContent())!;
    return str;
   } 

  compareArrays(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    if (set1.size !== set2.size) {
        return false;
    }

    for (const item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }

    return true;
}
    }