import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { FunnelPage } from '../pages/FunnelPage';
import { LoginPage } from '../pages/LoginPage';

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Create new Funnel and add Idea', async ({ page }) => {
  const funnelPage = new FunnelPage(page);
  const login = new LoginPage(page);
  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);
  await funnelPage.CreateFunnel("idea");
  await funnelPage.CreateNewidea();
  await funnelPage.fillIdeaDetails();
  await funnelPage.fillDetailsSection();
});
