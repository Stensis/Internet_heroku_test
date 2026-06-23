import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly logoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator("#username");
    this.password = page.locator("#password");
    this.loginBtn = page.locator(".radius");
    this.errorMsg = page.locator("#flash");

    this.logoutBtn = page.locator("a.button.secondary.radius");
  }

  async gotoLoginPage() {
    const response = await this.page.goto(
      "https://the-internet.herokuapp.com/login",
    );

    // If the server returns a 500 error or Heroku crash page
    if (!response || response.status() >= 500) {
      throw new Error(
        `Target website is down! Server responded with status ${response?.status()}`,
      );
    }
  }

  // To fill the login form:
  async fillLoginForm(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async clickLogout() {
    await this.logoutBtn.click();
    const response = await this.page.goto("https://the-internet.herokuapp.com/login")
  }

  

  errorMessage(): Locator {
    return this.errorMsg;
  }
}
