import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { BrandingPage } from '../pages/BrandingPage.js';
import fs from 'fs';
import path from 'path';

// Load data.json
const dataFilePath = path.resolve('./data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Branding Page', async ({ page }) => {
  const login = new LoginPage(page);
  const Branding = new BrandingPage(page);
  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);
  await Branding.navigateToSettings();
  await Branding.BrandingCompany();
  await Branding.ResetBrandingCompany();
}
)