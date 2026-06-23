import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

// 1. Declare the type for your custom fixtures
export type MyFixtures = {
  authenticatedPage: LoginPage;
};

// 2. Extend the base test with your custom fixture type
export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillLoginForm("tomsmith", "SuperSecretPassword!");
    
    // Pass the fixture instance to the test execution context
    await use(loginPage);
  },
});

// 3. Re-export expect so you can import both from this single file
export { expect };