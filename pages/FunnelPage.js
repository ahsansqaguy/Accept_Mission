const path = require('path');
import fs from 'fs';
import { IdeaPage } from './IdeaPage';
const { expect } = require('@playwright/test');
const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

class FunnelPage {
  constructor(page) {
    this.page = page;
  }

async  CreateFunnel(test) {
const adjectives = ['Smart', 'Agile', 'Creative', 'Efficient', 'Lean', 'Focused'];
const nouns = ['Strategy', 'Flow', 'Pipeline', 'Process', 'Path', 'Blueprint'];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
await this.page.locator('div.card-content:has(span.title-card:text("Funnels"))').click();
await this.page.getByRole('link', { name: 'Add Idea Funnel' }).click();
await this.page.locator('#funnel-title').click();
const title = `${getRandomItem(adjectives)} ${getRandomItem(nouns)}`;
console.log('Generated Funnel Title:', title);
await this.page.locator('#funnel-title').fill(title);
await this.page.locator('div:nth-child(3) > .div > .parent-position-relative > .select-wrapper > input').click();
await this.page.locator('span').filter({ hasText: 'General' }).click();
await this.page.locator('a').filter({ hasText: /^Save$/ }).click();
await this.page.getByRole('link', { name: 'Funnels', exact: true }).click();
await this.page.waitForSelector(`td >> text=${title}`, { timeout: 5000 });
if(test=="idea") {
await this.page.locator(`td >> text=${title}`).click();
await this.page.waitForLoadState('load');
await this.page.getByRole('link', { name: 'Add new idea' }).click();
}
else{
await this.page.getByRole('link', { name: 'Add Project Funnel' }).click();
}
}

async CreateNewidea() {
  const Idea = new IdeaPage(this.page);
  await Idea.uploadImage();
}

async fillIdeaDetails() {
await this.page.locator('#idea-title-field').click();
await this.page.locator('#idea-title-field').fill('Idea Title here');

// await this.page.getByRole('button', { name: 'Team' }).click();
await this.page.getByRole('button', { name: 'Add Team Member' }).click();
await this.page.getByText('Select', { exact: true }).click();
await this.page.locator('[role="option"]').first().click();
await this.page.getByRole('button', { name: 'Select innovation roles' }).click();
await this.page.getByLabel('Suggestions').getByText('Idea Owner').click();
await this.page.getByRole('button', { name: 'Add', exact: true }).click();

}

  async fillDetailsSection() {
    await this.page.locator("//span[normalize-space()='Details']").click();
    
    //Mission
    await this.page.locator("//span[normalize-space()='Details']").click();
    await expect(this.page.locator("(//button[@role='combobox'])[3]")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[3]").click();
    await this.page.locator("//div[contains(text(),'Company Idea Box')]").click();


    // Department
    await expect(this.page.locator("//label[normalize-space()='Department']")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[4]").click();
    await this.page.locator("//div[contains(text(),'Finance')]").click();
    
//Category

   await this.page.getByRole('button', { name: 'Select categories' }).click();
   await this.page.getByRole('option', { name: 'General' }).click();

   //Idea Type
    await expect(this.page.locator("//label[normalize-space()='Idea type']")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[5]").click();
    await this.page.locator("//div[contains(text(),'Ideas')]").click();

  //Status Reason
  const selectReasonsBtn = this.page.getByRole('button', { name: 'Select Reasons' });
  await selectReasonsBtn.waitFor({ state: 'visible' });
  await selectReasonsBtn.click();
  await this.page.locator("//span[normalize-space()='Good business case']").click();

  // Save Idea
  const Idea = new IdeaPage(this.page);
  await Idea.AddComment();
  await Idea.AddTask();
  await this.page.locator("//button[@id='create-idea-admin']").click();
}

}
module.exports = { FunnelPage };