import { test, expect } from "../fixtures/loginFixture";

test.describe("Logout Functionality Suite", () => {
  
  test("Should clear session and redirect to login page upon logout", async ({ authenticatedPage, page }) => {
    
    await test.step("Perform Logout operation", async () => {
      // 1. Click the actual button
      await authenticatedPage.clickLogout();
    });

    await test.step("Verify security redirection and confirmation banner", async () => {
      // ASSERTION 1: Verify the success green banner text
      const flashAlert = authenticatedPage.errorMessage(); 
      await expect(flashAlert).toBeVisible();
      await expect(flashAlert).toContainText("You logged out of the secure area!");

      // ASSERTION 2: Verify the browser URL changed back to the login route
      await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
      
      // ASSERTION 3: Verify the login form is visible again
      // (If the username field is visible, it proves we are back on the public login form)
      await expect(authenticatedPage.username).toBeVisible();
      await expect(authenticatedPage.password).toBeVisible();
    });
  });
});