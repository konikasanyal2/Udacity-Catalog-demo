import { Locator, Page } from "@playwright/test";

export class CommonLocators {
  page: Page;

  readonly udacitylogo: Locator;
  readonly searchButton: Locator;
  readonly skillInputField: Locator;
  readonly skillInput: Locator;
  readonly article: Locator;
  readonly noResult: Locator;

  constructor(page) {
    this.page = page;

    //locators
    this.udacitylogo = page.locator(
      '//a[@aria-label="Udacity part of Accenture logo"]',
    );
    this.searchButton = page.locator(
      '//input[@aria-label="Search input" and @placeholder="What do you want to learn?"]',
    );
    this.skillInput = page.locator('//div[@role="region" and @id="accordion-panel-:Riqksrlajl5t6:"]');
    this.skillInputField = page.locator('//input[@aria-owns="react-select-select-instance-skill-listbox"]');
    this.article = page.locator('//article[@role="group" and @class="css-1yzvs5q"]');
    this.noResult = page.locator('//h2[text()="No Results Found"]');
  //this.skillInputField = page.locator('//div[@id="react-select-select-instance-skill-placeholder"]/following-sibling::div[2]/input');
  }
}
