// tests/profile.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { MyProfile } from '../pages/MyProfilePage.js';
import fs from 'fs';
import path from 'path';

// Read JSON data
const dataFilePath = path.resolve('./data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('My Profile', async ({ page }) => {
  const login = new LoginPage(page);
  const profile = new MyProfile(page);

  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);

  await profile.navigateToSettings();

  // Navigate and click profile icon
  await profile.clickProfileIcon();

  const imagePath = path.resolve('tests/files/Mission.png');
  await profile.UploadImage(imagePath);
  await profile.UpdateProfile();
});
