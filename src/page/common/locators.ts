import { Locator, Page } from "@playwright/test";

export class CommonLocators {
  page: Page;

  readonly udacitylogo: Locator;
  readonly searchButton: Locator;
  readonly skillInputField: Locator;

  constructor(page) {
    this.page = page;

    //locators
    this.udacitylogo = page.locator(
      '//a[@aria-label="Udacity part of Accenture logo"]',
    );
    this.searchButton = page.locator(
      '//input[@aria-label="Search input" and @placeholder="What do you want to learn?"]',
    );
    this.skillInputField = page.locator('//div[@id="react-select-select-instance-skill-placeholder"]//input[@type="text" and @aria-expanded="false"]');
  //this.skillInputField = page.locator('//div[@id="react-select-select-instance-skill-placeholder"]/following-sibling::div[2]/input');
  }
}
