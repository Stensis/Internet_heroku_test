import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import loginData from "../test-data/LoginData.json";

test.describe("Login Data-Driven Tests", () => {
  for (const data of loginData) {
    test(`scenario - ${data.scenario}`, async ({ page }) => {
      test.skip(!data.run, "Skipping test because run flag is false");

      const loginPage = new LoginPage(page);

      await test.step("Go to login page", async () => {
        await loginPage.gotoLoginPage();
      });

      await test.step("Fill the login form and Login", async () => {
        await loginPage.fillLoginForm(data.username, data.password);
      });

      await test.step("Validate Result", async () => {
        const alertMessage = loginPage.errorMessage();

        await expect(alertMessage).toBeVisible();
        await expect(alertMessage).toContainText(data.expectedMessage);
      });
    });
  }
});
