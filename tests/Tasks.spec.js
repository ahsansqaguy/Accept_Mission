import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage.js';
import { TasksPage } from '../pages/TasksPage.js';

// Load data.json
const dataFilePath = path.resolve('./data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Add and Edit Task', async ({ page }) => {
  const login = new LoginPage(page);
  const Tasks = new TasksPage(page);
  await page.goto(data.login.url);
  await login.login(data.login.email, data.login.password);
  await Tasks.AddTask();
  await Tasks.EditTask();
  await Tasks.deleteTask();
  await Tasks.toggleShowCompletedTasks();
  await Tasks.FilterByowner();
}
)