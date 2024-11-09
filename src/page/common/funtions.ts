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
    let str = await element.textContent();
    return str;
   } 
    }