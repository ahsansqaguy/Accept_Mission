import { expect } from 'playwright/test';

export class LoginPage {
  constructor(page) {
      this.page = page;
      this.emailInput = "#user_email"
      this.passwordInput = "#user_password"
      this.logInButton = '//input[@type="submit"]'
      this.nextButton = '//a[text()="NEXT"]'
      this.companyExperienceTextLocator = '//label[text()="What is the experience level with Innovation?"]'
      this.ideaManagementLocator = '//span[text()="Idea Management"]'
      this.funnelManagementLocator = '//span[text()="Funnel Management"]'
      this.imgLocator = "#img_prev_settings"
      this.finishButton = '[value="FINISH"]'
      this.startButton = "//a[text()='START']"
      this.innovationStudioLocator = '//span[text()="Innovation Studio"]'
      this.userProfile = '[data-activates="user-dropdown"]'
      this.forgotPassword = "//a[text()='Forgot your password?']"
      this.resetPasswordButton = "[value='Reset Password']"
      this.confirmationMessageResetPassword = '//div[text()="You will receive an email with instructions on how to reset your password in a few minutes."]'
      this.confirmPasswordInput = '#user_password_confirmation'
      this.changeMyPasswordButton = '//input[@type="submit"]'
  }
      
  async login(email, password) {
    await this.page.fill(this.emailInput, email)
    await this.page.fill(this.passwordInput, password)
    await this.page.click(this.logInButton)
  }

  async resetPassword(email){
    await this.page.click(this.forgotPassword);
    await this.page.fill(this.emailInput, email);
    await this.page.click(this.resetPasswordButton);
    expect(await this.page.locator(this.confirmationMessageResetPassword)).toBeVisible
  }

  async createNewPassword(newPassword) {
    await this.page.fill(this.passwordInput, newPassword)
    await this.page.fill(this.confirmPasswordInput, newPassword)
    await this.page.click(this.changeMyPasswordButton)
}

  async clickNext(){
    await this.page.click(this.nextButton);
  }

}
