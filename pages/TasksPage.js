import { expect } from 'playwright/test';
import { IdeaPage } from './IdeaPage.js';
class TasksPage {
  constructor(page) {
    this.page = page;
    this.Title= '';
  }


async toggleShowCompletedTasks() {
const toggle = this.page.getByRole('switch', { name: 'Show completed tasks' });
if ((await toggle.getAttribute('aria-checked')) !== 'true') {
  await toggle.click();
}
await expect(this.page.locator('table th', { hasText: 'Completed' })).toBeVisible();
await toggle.click();
await expect(this.page.locator('table >> text=Completed')).toHaveCount(0);

}

async FilterByowner(){
await this.page.getByRole('combobox').first().click();
// await this.page.locator('div').filter({ hasText: /^OwnerMuhammad SQA Super Admin$/ }).getByRole('combobox').click();
await this.page.getByText('Support Accept Mission').click();
await this.page.waitForTimeout(500);
const countText = await this.page.locator('.js-task-count').innerText(); 
const initialCount = parseInt(countText.match(/\d+/)[0]); 
console.log(`Initial task count: ${initialCount}`);
//  await expect(initialCount).toBe(1);
}

async AddTask() {
  await this.page.getByRole('link', { name: 'Tasks' }).nth(0).click();
  await this.page
    .locator('div')
    .filter({ hasText: /^Show completed tasksAdd task$/ })
    .getByRole('button')
    .click();

  const Idea = new IdeaPage(this.page);
  const randomTitle = await Idea.fillTaskForm('task'); 
  this.Title = randomTitle;
}

async EditTask() {
 console.log(`Editing task with title: ${this.Title}`);
   await this.page.getByPlaceholder('Search', { exact: true }).fill(this.Title);
   await this.page.waitForTimeout(500);
    const rowLocator = this.page.locator(`tr:has(input[value="${this.Title}"])`);
    console.log(`Row locator for task:`, rowLocator);
    const editButton = rowLocator.locator('button[data-id]');
    await editButton.click();
    const Idea = new IdeaPage(this.page);
    const randomTitle = await Idea.fillTaskForm('task'); 
    this.Title = randomTitle;
    console.log(`New Task Title is  ${this.Title}`);
    await expect(this.page.locator(`tr:has(input[value="${this.Title}"])`)).toBeVisible();
}
 async deleteTask() {
  console.log(`Deleting task with title: ${this.Title}`);
  await this.page.getByPlaceholder('Search', { exact: true }).fill(this.Title);
  await this.page.waitForTimeout(500);
  const rowLocator = this.page.locator(`tr:has(input[value="${this.Title}"])`);
  const editButton = rowLocator.locator('button[data-id] svg');
  await editButton.click();
  this.page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept();
  });
  await this.page.getByRole('button', { name: 'Delete' }).click();
  await this.page.waitForTimeout(500);
  await expect(this.page.locator(`tr:has(input[value="${this.Title}"])`)).toHaveCount(0);
}}
export { TasksPage };

