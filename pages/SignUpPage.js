import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

export class SignUpPage {
    constructor(page) {
        this.page = page;
        this.signUpWithEmailButton = page.locator("div.signupemail-btn");
        this.companyNameInput = page.locator("#company_name_field");
        this.emailInput = page.locator("#user_email");
        this.firstNameInput = page.locator("#user_first_name");
        this.lastNameInput = page.locator("#user_last_name");
        this.passwordInput = page.locator("#user_password");
        this.SignupButton = page.getByRole('button', { name: 'Signup' });
        this.accountConfirmationtionText = '//h1[text()="Your account has been succesfully created"]';
    }

    async signUp(email, password) {
        await this.signUpWithEmailButton.click();
        await this.companyNameInput.fill(`automationQA+${Math.floor(Math.random() * 10000)}`);
        await this.emailInput.fill(email);
        await this.firstNameInput.fill(faker.person.firstName());
        await this.lastNameInput.fill(faker.person.lastName());
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(5000);
        await this.SignupButton.click();
        await expect(this.page.locator(this.accountConfirmationtionText)).toBeVisible();
    }
}