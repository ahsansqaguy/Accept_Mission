import fs from 'fs';
import path from 'path';
import { test } from '@playwright/test';
import { IdeaPage } from '../pages/IdeaPage';
import { LoginPage } from '../pages/LoginPage';
const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Add New Idea', async ({ page }) => {
  const ideaPage = new IdeaPage(page);
  const login = new LoginPage(page);
  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);
  await ideaPage.navigateToMission();
  const ideaTitle = await ideaPage.submitIdea();
  console.log(`Idea Title: ${ideaTitle}`);
  await ideaPage.openIdea(ideaTitle);
  await ideaPage.fillDetailsSection();
  await ideaPage.AddComment()
  await ideaPage.AddTask()
  await page.getByRole('button', { name: 'Save Idea' }).click();
});



