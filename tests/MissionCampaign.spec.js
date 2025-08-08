import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { MissionCampaignPage } from '../pages/MissionCampaignPage.js';

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Create Mission Campaign', async ({ page }) => {
   const login = new LoginPage(page);
   const Mission= new MissionCampaignPage(page);
  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);
  await Mission.createMissionCampaign();
  await page.locator('#next-inbox').click();
  await Mission.shareMissionCampaign();
});

