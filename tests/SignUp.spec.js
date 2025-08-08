import { expect, test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { VerifyEmailPage } from '../pages/verifyEmailPage';
const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

function createMailinatorEmail(prefix = 'acceptqatest') {
    const uniqueId = Math.floor(Math.random() * 90 + 10); 
    return `${prefix}+automationtest${uniqueId}@mailinator.com`;
}

test('User can sign up through email', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const signUpPage = new SignUpPage(page);
    const email = createMailinatorEmail(); 
    const password = data.login.password;
    const emailPrefix = email.split('@')[0];
    await page.goto(data.signup.url);
    await expect(page).toHaveURL(data.signup.url);
    await signUpPage.signUp(email, password);
    const page1 = await context.newPage();
    const verifyEmailPage = new VerifyEmailPage(page1);
    const loginTab = await verifyEmailPage.loginAndVerifyConfirmationEmail(emailPrefix);
    console.log('Login tab URL:', loginTab);
    const loginPage = new LoginPage(loginTab);
    await loginPage.login(email, password);
    await page.waitForTimeout(2000)
    const currentUrl = loginTab.url();
    if (currentUrl.includes('/wizard/step1'))
    {
        await expect(loginTab.locator(loginPage.companyExperienceTextLocator)).toBeVisible();
        await loginPage.clickNext();
        await expect(loginTab.locator(loginPage.ideaManagementLocator)).toBeVisible();
        await expect(loginTab.locator(loginPage.funnelManagementLocator)).toBeVisible();
        await loginPage.clickNext();
        await expect(loginTab.locator(loginPage.imgLocator)).toBeVisible();
        await loginTab.locator(loginPage.finishButton).click();
        await loginTab.locator(loginPage.startButton).click();
        await expect(loginTab.locator(loginPage.userProfile)).toBeVisible();
    }
    else {
        expect(currentUrl).toContain('/admin-studio');
    }
    await context.close();
});

test('User can Log In through email', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await page.goto(data.login.url)
    await loginPage.login(data.login.email, data.login.password);
    await page.waitForTimeout(2000)
    const currentUrl = page.url();
    if (currentUrl.includes('/wizard/step1'))
    {
        await expect(page.locator(loginPage.companyExperienceTextLocator)).toBeVisible();
        await loginPage.clickNext();
        await expect(page.locator(loginPage.ideaManagementLocator)).toBeVisible();
        await expect(page.locator(loginPage.funnelManagementLocator)).toBeVisible();
        await loginPage.clickNext();
        await expect(page.locator(loginPage.imgLocator)).toBeVisible();
        await page.locator(loginPage.finishButton).click();
        await page.locator(loginPage.startButton).click();
        await expect(page.locator(loginPage.userProfile)).toBeVisible();
    }
    else {
        expect(currentUrl).toContain('/admin-studio');
        await page.goto(data.Idea.IdeaUrl)
    }
    await context.close();
});
