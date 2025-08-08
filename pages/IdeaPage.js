const path = require('path');
import fs from 'fs';
const { expect } = require('@playwright/test');
const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

class IdeaPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToMission() {
    await this.page.locator("//a[@href='/home']//div[@class='card-content']").click();
    await expect(this.page).toHaveURL(data.PagesUrl.InnovationPortal);
  }

  async submitIdea() {
    await this.page.locator("//a[normalize-space()='Submit Idea']").click();
    await this.uploadImage();
    await this.page.waitForTimeout(3000);
    const randomId = Math.floor(Math.random() * 1000000);
    const ideaTitle = `New Idea for test automation ${randomId}`;
    await this.page.locator('#idea-title-field').click();
    await this.page.locator('#idea-title-field').fill(ideaTitle);
    await this.fillDescription();
    await this.addComment();
    await this.addFile();

    await this.page.getByRole('button', { name: 'SUBMIT IDEA' }).click();
    return ideaTitle;
  }

  async uploadImage() {
    await this.page.locator("//div[contains(@class, 'group-hover/image:opacity-100')]").click();
    await expect(this.page.locator("//h2[contains(@id, 'radix')]")).toBeVisible();
    const input = this.page.locator("//input[@type='file' and contains(@class, 'file_input')]");
    const filePath = path.resolve(__dirname, '../tests/files/STAMP.jpeg');
    await input.setInputFiles(filePath);
    await this.page.locator("//button[normalize-space()='Save selection']").click();
  }

async fillDescription() {
  const editorTrigger = this.page.locator("//div[@class='input-field description-field']//div[@role='button'][normalize-space()='p']");
  const editArea = this.page.locator("//div[@class='input-field description-field']//div[@class='tox-edit-area']");

  if (await editorTrigger.isVisible()) {
    await editorTrigger.click();
  }
  if (await editArea.isVisible()) {
    await editArea.click();
    await editArea.type('Descriptive text for creating ideas');
  } else {
    console.warn('Description editor not visible — skipping typing.');
  }
}


  // async fillIdeaDetails() {
  //   // await this.page.locator("//div[@class='flex items-center text-sm font-medium border border-gray-300 rounded-lg ltr:md:ml-auto rtl:md:mr-auto max-lg:order-1']//span[contains(text(),'SUBMIT IDEA')]").click();
  //   const randomId = Math.floor(Math.random() * 1000000);
  //   const ideaTitle = `Idea ${randomId}`;
  //   await this.page.locator("//textarea[@id='idea-title-field']").type(ideaTitle, { timeout: 2000 });
  //   await this.page.locator("//button[normalize-space()='Select Department']").click();
  //   await this.page.locator("//div[contains(text(),'Quality Assurance')]").click();
  //   await this.page.locator("//div[@class='flex items-center justify-between w-full mx-auto']").click();
  //   await this.page.locator("//span[normalize-space()='New Category']").click();
  //   await this.page.waitForTimeout(3000);
  //   return ideaTitle
  // }

  async addComment() {
    await this.page.locator("//a[@id='comment_tablink']").click();
    await expect(this.page.locator("//h2[normalize-space()='Comments']")).toBeVisible();
    await this.page.locator("//textarea[@placeholder='Write your comment...']").type('HERE IS NEW COMMENT', { timeout: 2000 });
    await this.page.locator("//span[contains(@class,'flex flex-shrink-0 items-center svg-icon px-3')]").click({ timeout: 2000 });
    await this.page.locator("//img[@alt='innocent']").click();
    await this.page.locator("//button[normalize-space()='Submit']").click();
    await this.page.getByRole('link', { name: 'Files' }).click();
  }

  async addFile() {
    const isLinkSectionVisible = await this.page.locator("//h3[normalize-space()='Add Link']").isVisible();

if (!isLinkSectionVisible) {
  await this.page.getByRole('button', { name: 'Link / Files' }).click();
}
// Now proceed as normal
  await this.page.locator("//a[@id='addfiles_tablink']").click();
  await expect(this.page.locator("//h3[normalize-space()='Add Link']")).toBeVisible();
  await this.page.locator("//input[@id='attachment_name_idea_attachment']").type('This is a file');
  await this.page.locator("//input[@id='attachment_link_idea_attachment']").type("https://automationqa-7082.acceptmission.com/home");
  await this.page.locator("//button[normalize-space()='Add Link']").click();

  }


async openIdea(ideaTitle) {
  await this.page.waitForTimeout(2000);
  await this.page.getByRole('link', { name: ideaTitle }).click();
  await this.page.locator("//a[normalize-space()='Advanced edit']").click();
}


  async fillDetailsSection() {
    await this.page.waitForTimeout(2000);
    await this.page.locator("//span[normalize-space()='Details']").click();

    // Funnel
    await expect(this.page.locator("//label[normalize-space()='Funnel']")).toBeVisible();
    await expect(this.page.locator("(//button[@role='combobox'])[1]")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[1]").click();
    await this.page.locator("//div[@role='option']").first().click();

    // Lane
    await this.page.locator("(//button[@role='combobox'])[2]").click();
    await this.page.locator("//div[@role='option']").first().click();

    //Mission
    await this.page.locator("//span[normalize-space()='Details']").click();
    await expect(this.page.locator("(//button[@role='combobox'])[3]")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[3]").click();
    await this.page.locator("//div[@role='option']").first().click();

    //Idea Date
    await expect(this.page.locator("//label[normalize-space()='Idea deadline']")).toBeVisible();
    await this.page.locator('div#idea_deadline button[aria-haspopup="dialog"]').click();
    await this.page.locator("//button[normalize-space()='Today']").click();

    // Department
    await expect(this.page.locator("//label[normalize-space()='Department']")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[4]").click();
    await this.page.locator("//div[@role='option']").first().click();
    
    //Catagory
    await expect(this.page.locator("//label[normalize-space()='Categories']")).toBeVisible();
    await this.page.locator("//span[normalize-space()='Select categories']").click();
    await this.page.locator("//div[@role='option']").nth(1).click();

   //Idea Type
    await expect(this.page.locator("//label[normalize-space()='Idea type']")).toBeVisible();
    await this.page.locator("(//button[@role='combobox'])[5]").click();
    await this.page.locator("//div[@role='option']").first().click();

    //Innovation Type
    await expect(this.page.locator("//label[normalize-space()='Innovation type']")).toBeVisible();
    await this.page.locator("(//button[@aria-controls='radix-«ra»'])[1]").click();
    await this.page.locator("//div[normalize-space()='test']").click();

    // Status
    await expect(this.page.locator("//label[normalize-space()='Status']")).toBeVisible();
    await this.page.locator("//button[@aria-controls='radix-«rb»']").click();
    await this.page.locator("//div[contains(text(),'Submitted')]").click();

  //Status Reason
   const selectReasonsBtn = this.page.getByRole('button', { name: 'Select Reasons' });
   await selectReasonsBtn.waitFor({ state: 'visible' });
   await selectReasonsBtn.click();
   await this.page.locator("//span[normalize-space()='Good business case']").click();

}
   async AddComment(){
    
  await this.page.getByRole('button', { name: 'Comments' }).click();
  await this.page.getByPlaceholder('Write your comment...').click();
  await this.page.getByPlaceholder('Write your comment...').fill('This is a Test Comment');
  await this.page.getByRole('button', { name: 'Emoji' }).click();
  await this.page.getByLabel('slightly smiling face').click();
  await this.page.getByRole('button', { name: 'Submit' }).click();

  }
 
  async openTaskModal() {
  await this.page.getByRole('button', { name: 'Tasks' }).click();
  await this.page.locator('#add-task-btn').click();
}

async fillTaskForm(task) {
  const randomTitle = `Task ${Math.floor(Math.random() * 10000)}`;
  const randomPhase = `Phase ${Math.ceil(Math.random() * 5)}`;
  const randomPriority = Math.ceil(Math.random() * 5);
  await this.page.getByLabel('Title').click();
  await this.page.getByLabel('Title').fill(randomTitle);

  await this.page.getByLabel('Phase').click();
  await this.page.getByLabel('Phase').fill(randomPhase);
//  await this.page
//   .locator('div.field', { has: this.page.locator('label:has-text("Start date")') })
//   .locator('button[aria-haspopup="dialog"]')
//   .filter({ hasNot: this.page.locator('[style*="display: none"]') })
//   .first()
//   .click();


  // await this.page.getByRole('gridcell').nth(Math.floor(Math.random() * 28)).click(); 

  // Random end date (Next month random day)
  await this.page.locator('div.field:has(label:text("Due date")) button[aria-haspopup="dialog"]').click();
  await this.page.getByLabel('Go to next month').last().click();


  await this.page.getByRole('gridcell').nth(Math.floor(Math.random() * 28)).click();
  if (task === 'task') {
   await this.page.locator('button[role="combobox"]:has-text("Not started")').last().click();
  }
  else {
    await this.page.locator('button[role="combobox"]:has-text("Not started")').click();
  }
  await this.page.getByRole('option').first().click();
  await this.page.locator('button').filter({ hasText: /^0$/ }).first().click();
  await this.page.getByRole('option', { name: `${randomPriority}`, exact: true }).click();
  await this.page.getByRole('button', { name: 'Save' }).click();
  console.log(`Created task: ${randomTitle} | ${randomPhase} | Priority: ${randomPriority}`);
  return randomTitle
}

async AddTask() {
  await this.openTaskModal();
  await this.fillTaskForm();
}
}
module.exports = { IdeaPage };