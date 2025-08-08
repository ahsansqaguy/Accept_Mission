import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

function getRandomString(prefix) {
  return `${prefix}-${Math.random().toString(36).substring(2, 8)}`;
}

class InnovationPortal {
  constructor(page) {
    this.page = page;

    // Navigation links
    this.linkInnovationStudio = page.getByRole('link', { name: 'Innovation Studio' });
    this.linkStartProductTour = page.getByRole('link', { name: 'Start product tour' });
    this.linkPlayVideoTour = page.getByRole('link', { name: 'Play video tour' });
    this.linkArticlesFAQs = page.getByRole('link', { name: "Articles & FAQ's" });
    this.linkAllIdeas = page.getByRole('link', { name: 'All Ideas' });
    this.linkAllProjects = page.getByRole('link', { name: 'All Projects' });
    this.linkDepartments = page.getByRole('link', { name: 'Departments' });
    this.linkCategories = page.getByRole('link', { name: 'Categories' });
    this.linkGoals = page.getByRole('link', { name: 'Goals' });
    this.linkTasks = page.getByRole('link', { name: 'Tasks' });

    // Tabs and sections
    this.tabPeople = page.locator('#showgoalstab').getByText('People');
    this.rightArrow = page.locator('#right-arrow').getByRole('img');

    // Other links
    this.marketingDepartment = page.getByRole('link', { name: 'Marketing D 1 0' });
    this.allCategories = page.getByRole('link', { name: 'All Categories' });
    this.tasksPastDue = page.getByRole('cell', { name: 'Tasks past due date' });

    // Task editor locators
    this.taskMenuButton = page.locator("//button[contains(@class, 'p-1')]");
    this.taskTabButton = page.getByRole('button', { name: 'Tasks' });
    this.addTaskButton = page.locator('#add-task-btn');
    this.titleField = page.getByLabel('Title');
    this.phaseField = page.getByLabel('Phase');
    this.startDateButton = page.locator('div.field', { has: this.page.locator('label:has-text("Start date")') }).locator('button[aria-haspopup="dialog"]').filter({ hasText: "Pick a date" }) .filter({ hasNot: this.page.locator('[style*="display: none"]') })
    this.startDateCell = page.getByRole('gridcell', { name: '30' }).nth(1);
    this.todayButton= page.getByRole('button', { name: 'Today' })
    this.endDateButton = page.getByRole('button', { name: 'Pick a date' });
    this.nextMonthButton = page.getByLabel('Go to next month').nth(1);
    this.endDateCell = page.getByRole('gridcell', { name: '30' }).nth(1);
    this.statusDropdown = page.getByText('Status 1In progress')
    this.statusOption = page.getByRole('option', { name: 'In progress' })
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async CheckAllTabs() {
    await this.linkInnovationStudio.click();
    await expect(this.page).toHaveURL(data.PagesUrl.AdminStudio);
    await this.page.goBack();

  // Play Video Tour
await this.page.getByText('Learn', { exact: true }).click();
// await this.linkStartProductTour.click();

// First popup
// const [popup1] = await Promise.all([
//   this.page.waitForEvent('popup'),
//   this.linkStartProductTour.click(),
// ]);
// await popup1.waitForLoadState();
// expect(popup1.url()).toContain('vimeo.com');

// Second popup
const [popup2] = await Promise.all([
  this.page.waitForEvent('popup'),
  this.linkPlayVideoTour.click(),
]);
await popup2.waitForLoadState();
expect(popup2.url()).toContain('8842482-innovation-portal');

// Third popup
const [popup3] = await Promise.all([
  this.page.waitForEvent('popup'),
  this.linkArticlesFAQs.click(),
]);
await popup3.waitForLoadState();
expect(popup3.url()).toContain('support.acceptmission.com/en/');



    await this.linkAllIdeas.click();
    await this.page.locator('//div[@id="allideastab"]//li[1]').click();
    expect(this.page.url()).toContain('https://automationqa-7082.acceptmission.com/ideas');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
    this.page.getByRole('link', { name: 'All Projects' }).click();

    await this.page.locator('//div[@id="allprojectstab"]//li[1]').click();
    expect(this.page.url()).toContain('https://automationqa-7082.acceptmission.com/studio/projects');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
    await this.linkDepartments.click();
    await this.page.locator('//div[@id="departmentstab"]//li[1]').click();
    expect(this.page.url()).toContain('https://automationqa-7082.acceptmission.com/department');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
    await this.linkCategories.click();
    await this.page.locator('//div[@id="categoriestab"]//li[1]').click();
    expect(this.page.url()).toContain('https://automationqa-7082.acceptmission.com/category');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
    await this.linkGoals.click();
    await expect(this.tabPeople).toBeVisible();
    await this.rightArrow.click();
    await this.rightArrow.click();

    await this.page.getByRole('link', { name: 'Trending Tags' }).click();
    await expect(this.page.getByRole('link', { name: '# Artificial Intelligence' })).toBeVisible();

    await this.linkTasks.click();
    await expect(this.tasksPastDue).toBeVisible();
  }

  async EditTask() {
    const randomTitle = getRandomString('Task');
    const randomPhase = getRandomString('Phase');

    await this.taskMenuButton.click();

    await this.titleField.click();
    await this.titleField.fill(randomTitle);
    await this.phaseField.click();
    await this.phaseField.fill(randomPhase);

    // await this.startDateButton.first().click();
    // await this.startDateCell.click();
    // await this.todayButton.click();
    // await this.endDateButton.click();
    // await this.nextMonthButton.click();
    // await this.endDateCell.click();
    // await this.statusDropdown.click();
    // await this.statusOption.click();
    await this.saveButton.click();
  }
}

export { InnovationPortal };

