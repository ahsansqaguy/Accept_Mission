import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from '../pages/LoginPage.js';
import { DepartmentsPage } from '../pages/DepartmentPage.js';

const dataFilePath = path.resolve('./data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

test('Add, Edit, and Delete Department', async ({ page }) => {
 const login = new LoginPage(page);
 const department = new DepartmentsPage(page);
 await page.goto(data.login.url);
 await login.login(data.login.email, data.login.password);
 await department.AddDepartment();
 await department.editDepartment();
 await department.VerifyDepartment();
 await department.deleteDepartment();
}
)
