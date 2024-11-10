# Udacity-Catalog-demo
**Objective**
Create automated test scripts capable of driving both UI and API validation using Playwright with TypeScript.
Link to Application for Testing : Udacity Catalog

**Framework Setup**
Implement a Cucumber-based automation framework using TypeScript and Playwright.
Utilize Page Object Model (POM) design pattern having page fixtures for better organisation of code.
Utilize playwright methods to validate UI result with API response

**Positive Test Case**

**Scenario:** Validate Search Functionality  :-

1.Given the application is loaded successfully  
2.And user search for "Testing"  
3.And user clicks on "Skill" Dropdown  
4.When user search for "Automation testing" in Skill Dropdown  
5.Then user sees results matching the search term in the UI  
6.And user fetch search results from the API  

**Expected Behaviour :** Then the UI results should match the API results

**Testing ALGO Used :** 
1. Navigate to Udacity Catalog page and perform Search functionality.
2. Capture and store results in the uiResults property.
3. Store the API response in the apiResults property.
4. Implement assertions to compare the number of results and details (titles, descriptions) from uiResults and apiResults.

**Expected :** Use assertions to check if each UI result corresponds correctly to the API result.

**Negative Test Case**

**Scenario:** Invalid Search with No Results

1.Given the application is loaded successfully 

2.When user search for "NonExistentTerm"

**Expected Behaviour :** Then user should see a "No results found" message

**Testing ALGO Used :** 
1. Navigate to Udacity Catalog page and perform Search functionality.

**Expected :** User should be displayed with "No Result Found" Verbiage in UI

**FrameWork Description :**

**Base > Fixture.ts File :** defined setup and teardown logic, which is executed before and after each test or test suite. This is crucial for ensuring that the test environment is properly prepared and cleaned up, which makes your tests more reliable.

**BrowserStack folder:** It has two files i.e bstack caps which holds all browserstack capabilities configuration and bstack services which holds all browserstack services required to integrate.

**Data Folder :** For now it contains only one file i.e constant.ts in which all the test data is added which can be used across the framework for BDD framework.

**Global Folder :** It contains folder i.e global setup and global teardown files 

**Page Folder :**
It contains **common folder** for now having two page class i.e locators.ts and functions.ts as this framework is dipicting search functionality only, in Udacity Catalog page which can be used across webpage. so kept in common folder. 
For other pages we can create a new test class file under page folder.

**Tests Folder :** Folder where all playwright spec.ts test files are available. (For now it only **searchFunctionality.spec.ts**)

**Playwright.config.ts :** It contains all the configurations related to global setup, global teardown, projects etc. 

**How to Execute Playwright Test :**

npx playwright test --grep @successsearch --project chrome --reporter=html --workers=1 --debug;     ---For debuging

npx playwright test --grep @successsearch --project chrome --reporter=html --workers=1 --for execution
