import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {ProjectPage} from '../pages/ProjectPage';
import { LoginPage } from '../pages/LoginPage';

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Create new Funnel and add Project', async ({ page }) => {
  const Project = new ProjectPage(page);
  const login = new LoginPage(page);
  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);
  await Project.CreateProject();
  // await Project.EditProject();
  await Project.VerifyProjectDetails();
});


