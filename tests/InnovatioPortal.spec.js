import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { InnovationPortal } from '../pages/InnovatioPortalPage';
import { LoginPage } from '../pages/LoginPage';

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Innovation Portal', async ({ page }) => {
const login = new LoginPage(page);
await page.goto(data.login.url);
await login.login(data.login.email, data.login.password);
await page.goto(data.PagesUrl.InnovationPortal);
const innovationPortal = new InnovationPortal(page);
await innovationPortal.CheckAllTabs();
await innovationPortal.EditTask();
});
