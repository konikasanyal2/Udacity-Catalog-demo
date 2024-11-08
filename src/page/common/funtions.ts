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
  locateByText(value: string) {
    return this.page.locator(`//*[contains(text(),"${value}")]`);
  }
  async locateByRegionRole(role: string){
    return this.page.locator('role=region[name="'+role+'"] >> xpath=//*[@id="react-select-select-instance-skill-placeholder"]')
  }
    
    }