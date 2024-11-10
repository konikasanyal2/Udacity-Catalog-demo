import { Locator, Page } from "@playwright/test";

export class CommonLocators {
  page: Page;

  readonly udacitylogo: Locator;
  readonly searchButton: Locator;
  readonly searchInputBox : Locator;
  readonly skillInputField: Locator;
  readonly skillInput: Locator;
  readonly article: Locator;
  readonly noResult: Locator;
  readonly serchResultheading: Locator;

  constructor(page) {
    this.page = page;

    //locators
    this.udacitylogo = this.page.locator(
      '//a[@aria-label="Udacity part of Accenture logo"]',
    );
    this.searchButton = this.page.locator('//button[@aria-label="Search"]');
    this.searchInputBox = this.page.getByRole('searchbox', { name: 'Search input' });
    this.skillInput = this.page.locator('//div[@role="region" and @id="accordion-panel-:Riqksrlajl5t6:"]');
    this.skillInputField = this.page.locator('//input[@aria-owns="react-select-select-instance-skill-listbox"]');
    this.article = this.page.locator('//article[@role="group" and @class="css-1yzvs5q"]');
    this.noResult = this.page.locator('//h2[text()="No Results Found"]');
    this.serchResultheading = this.page.getByRole('heading', { name: 'Search results for ' })
  //this.skillInputField = page.locator('//div[@id="react-select-select-instance-skill-placeholder"]/following-sibling::div[2]/input');
  }
}
