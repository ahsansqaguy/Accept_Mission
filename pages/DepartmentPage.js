import { expect } from 'playwright/test';
const path = require('path');
// const dataFilePath = path.resolve(__dirname, '../data/data.json');

class DepartmentsPage {
  constructor(page) {
    this.page = page;
    this.departmentTitle = '';
    this.departmentDescription = '';
  }

async uploadImage() {
   await this.page.getByText('Edit image').click();
    const input = this.page.locator("//input[@type='file' and contains(@class, 'file_input')]");
    const filePath = path.resolve(__dirname, '../tests/files/DEPT.jpg');
    await input.setInputFiles(filePath);
    await this.page.getByRole('button', { name: 'Save selection' }).click();
}

async AddDepartment() {
  const randomSuffix = Math.floor(Math.random() * 10000); 
  const title = `Dept ${randomSuffix}`;
  const description = `This is a description for Department ${randomSuffix}`;
  await this.page.getByRole('link', { name: 'settings Settings All the' }).click();
  await this.page.getByRole('link', { name: 'Departments', exact: true }).click();
  await this.page.getByRole('link', { name: 'Add department' }).click();

  await this.uploadImage();
  await this.page.waitForTimeout(5000); 
  await this.page.locator('#department_title').fill(title);
  await this.page.getByRole('combobox').click();
  await this.page.getByLabel('Suggestions').getByText('Muhammad SQA Super Admin').click();
  await this.page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph').click();
  await this.page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph').fill(description);
  await this.page.locator('div').filter({ hasText: /^Save$/ }).getByRole('button').click();
  this.departmentTitle = title;
  this.departmentDescription = description;
  console.log(`Department added: ${title}`);
  this.departmentTitle = title;
  this.departmentDescription = description;
}

async editDepartment() {
  const row = this.page.locator('tr[role="row"]', { hasText: this.departmentTitle });
  await row.scrollIntoViewIfNeeded();
  await expect(row).toBeVisible();
  await row.locator('a[href$="/edit"] svg').click();
  const randomId = Math.floor(Math.random() * 10000);
  const newTitle = `Dept-${randomId}`;
  const newDescription = `Updated department description ${randomId}`;
  const titleField =   await this.page.locator('#department_title')
  await this.page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph').click();
  await this.page.locator('iframe[title="Rich Text Area"]').contentFrame().getByRole('paragraph').fill(newDescription);
  await titleField.fill(newTitle);
  this.departmentTitle = newTitle;
  await this.page.getByRole('button', { name: /save/i }).nth(1).click(); 
}


async deleteDepartment() {
  await this.page.goto("https://automationqa-7082.acceptmission.com/settings/departments")
 const row = this.page.locator('tr[role="row"]', {
    hasText: this.departmentTitle,
  });

  await expect(row).toBeVisible();
  const allButtons = row.locator('button');
  const deleteButton = allButtons.last();
  await deleteButton.click();
  await this.page.getByLabel('Accept').click();

  await expect(this.page.locator('tr[role="row"]', { hasText: this.departmentTitle })).toHaveCount(0);
  console.log(`Successfully deleted department: ${this.departmentTitle}`);
}

async VerifyDepartment() {
  await this.page.goto("https://automationqa-7082.acceptmission.com/studio/ideas/109")
  await this.page.getByRole('button', { name: 'Details' }).click();
  await this.page.getByText('Select Department').click();
  await expect(this.page.getByRole('option', { name: this.departmentTitle })).toBeVisible();
  await this.page.getByRole('option', { name: this.departmentTitle }).click();
}

// async MergeDepartment() {
// const rows = await this.page.locator('tbody tr[role="row"]');
// console.log(await rows.count()); // row count

// const checkboxes = await this.page.locator('input[type="checkbox"]');
// console.log(await checkboxes.count()); // checkbox count
//   // if (count >= 2) {
//   //   await checkboxes.nth(count - 2).check();
//   //   await checkboxes.nth(count - 1).check();
//   //   await this.page.getByRole('button', { name: 'Action' }).click();
//   //   await this.page.getByText('Merge', { exact: true }).click();
//   // } else {
//   //   throw new Error('Not enough rows to select for merge.');
//   // }

// }


}
export { DepartmentsPage };

