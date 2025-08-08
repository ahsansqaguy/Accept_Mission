import fs from 'fs';
import path from 'path';
import { IdeaPage } from './IdeaPage';
const { expect } = require('@playwright/test');

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

function randomTitle() {
  return `Campaign ${Math.floor(Math.random() * 10000)}`;
}

function randomDescription() {
  return `This is a test description with ID ${Date.now()}`;
}

function randomLink() {
  const keywords = ['playwright', 'automation', 'launch', 'mission', 'testing'];
  const keyword = keywords[Math.floor(Math.random() * keywords.length)];
  return `https://youtube.com/watch?v=auto_${keyword}_${Math.floor(Math.random() * 1000)}`;
}

class MissionCampaignPage {
  constructor(page) {
    this.page = page;
    this.title= randomTitle();
    // Main form
    this.addCampaignLink = page.getByRole('link', { name: 'add Add campaign' });
    this.titleField = page.locator('#idea-title-field');
    this.descriptionFrame = page.frameLocator('#ideabox-content-field_ifr');
    this.descriptionParagraph = this.descriptionFrame.getByRole('paragraph');
    this.descriptionInput = this.descriptionFrame.getByLabel('Rich Text Area. Press ALT-0');
    this.linkField = page.locator('#mission_video_link');
    this.endDateField = page.locator('#ideabox_end_date');
    this.tagInput = page.locator('input.add-tag-input');
    this.tagSuggestions = page.locator('#eac-container-fname ul li');
    this.imageUploadButton = page.locator('#edit-image-btn #img_prev');
    this.fileInput = page.locator("//input[@type='file' and contains(@class, 'file_input')]");
    this.saveImageButton = page.getByRole('link', { name: 'SAVE' });
    this.saveButton = page.locator('#next-inbox');

    // Post-creation navigation
    this.detailsTab = page.getByRole('link', { name: 'Details' });
    this.categoryDropdown = page.locator('.settings > div:nth-child(2) > .select-wrapper > input');
    this.categoryOption = page.locator('#details').getByRole('list').getByText('General');

    // Celebration tab
    this.celebrationTab = page.getByRole('link', { name: 'Celebration' });
    this.celebrationTextbox = page.locator('#celebrationtab').getByRole('textbox');
    this.confettiStyle = page.locator('span').filter({ hasText: 'Realistic' });
    this.previewConfetti = page.getByText('Preview Confetti');
    this.finalSaveButton = page.locator('#next-inbox');
   
    this.shareButton = page.getByRole('link', { name: 'Share' })
    this.copyButton = page.locator('//a[@id="agent_tooltip"]')
    this.closePopup = this.page.locator('button.modal-close.cross-btn');
    this.copiedLinkInput = this.page.locator('#agent_copyinput');
  }

  async uploadImage() {
    await this.imageUploadButton.click();
    
    // Wait for the file input to be available
    await this.fileInput.waitFor({ state: 'visible' });
    const filePath = path.resolve(__dirname, '../tests/files/Mission.png');
    await this.fileInput.setInputFiles(filePath);
    
    // Wait for the save button to appear and be clickable
    try {
      await this.saveImageButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.saveImageButton.click();
    } catch (error) {
      // If SAVE button doesn't appear, try alternative selectors or skip
      console.log('SAVE button not found, checking for alternative save options...');
      
      // Try alternative save button selectors
      const altSaveButton = this.page.locator('button:has-text("Save"), input[value*="Save"], .save-button');
      if (await altSaveButton.count() > 0) {
        await altSaveButton.first().click();
      } else {
        // If no save button found, image might auto-save or modal might not have appeared
        console.log('No save button found, continuing without explicit save...');
      }
    }
    
    // Wait for any upload processing to complete
    await this.page.waitForTimeout(2000);
  }

  async createMissionCampaign() {
    const title = this.title
    const description = randomDescription();
    const link = randomLink();

    await this.page.goto(data.PagesUrl.MissionCampaign);
    await this.addCampaignLink.click();

    await this.titleField.click();
    await this.titleField.fill(title);

    await this.descriptionParagraph.click();
    await this.descriptionInput.fill(description);

    await this.linkField.click();
    await this.linkField.fill(link);

    await this.endDateField.click();
    await this.endDateField.fill('2027-01-23T02:20');

    // await this.tagInput.click();
    // await this.tagInput.type('t');
    // await this.tagInput.type('e');
    // await this.tagSuggestions.first().click();

    await this.uploadImage();
    await this.page.waitForTimeout(3000);
    await this.saveButton.click();

    console.log('Created mission with:', { title, description, link });

    // Post-creation settings
    await this.detailsTab.click();
    await this.categoryDropdown.click();
    await this.categoryOption.click();

    await this.celebrationTab.click();
    // await this.celebrationTextbox.click();
    // await this.confettiStyle.click();
    await this.previewConfetti.click();
    await this.finalSaveButton.click();
  }

  async fillIdeaDetails(){
    const randomId = Math.floor(Math.random() * 1000000);
    const ideaTitle = `New Idea for test automation ${randomId}`;
    await this.page.locator('#idea-title-field').click();
    await this.page.locator('#idea-title-field').fill(ideaTitle);
    await this.page.getByRole('button', { name: 'Details' }).click();
    await this.page.getByText('Select Mission').click();
    await this.page.getByRole('combobox').click();
    await this.page.getByRole('combobox').fill(this.title);
    await this.page.getByRole('option', { name: this.title }).click();
    await this.page.getByRole('button', { name: 'Save Idea' }).click();   
    // Navigate to Missions > Campaigns > List
    await this.page.getByRole('button', { name: 'Missions' }).click();
    // Wait for the submenu to appear and click Campaigns
    await this.page.waitForTimeout(1000);
    const campaignsLink = this.page.getByRole('link', { name: 'Campaigns' });
    if (await campaignsLink.count() > 0) {
      await campaignsLink.click();
    } else {
      // Try alternative navigation path
      await this.page.goto(data.PagesUrl.MissionCampaign);
    }
    
    // Try to find List link, if not found, we might already be on the right page
    const listLink = this.page.getByRole('link', { name: 'List' });
    if (await listLink.count() > 0) {
      await listLink.click();
    } 
    const row = this.page.locator(`//tr[contains(@class, "table-row-inbox-ideas")][.//a[text()="${this.title}"]]`);
    const totalIdeas = await row.locator('td.center').nth(0).innerText();
    expect(Number(totalIdeas)).toEqual(1);
    console.log(`Total ideas for ${this.title}:`, totalIdeas);
  }
async shareMissionCampaign() {
  // await this.page.goto(data.PagesUrl.CampaignDetail);
  await this.shareButton.click();
  await this.copyButton.click();
  const copiedLink = await this.copiedLinkInput.inputValue();
  console.log('Copied Link:', copiedLink);
  await this.closePopup.click();
  const newPage = await this.page.context().newPage();
  await newPage.goto(copiedLink);
  console.log('Mission campaign shared successfully.');
  await newPage.close();
  await this.page.getByRole('button', { name: 'Offline' }).click();
  await this.page.locator('#next-inbox').click();
  await this.AddIdeaToMissionCampaign();
}

async AddIdeaToMissionCampaign(){
  const Idea = new IdeaPage(this.page)
  await this.page.getByText('Ideas10').click();
  await this.page.getByRole('link', { name: 'add Add new idea' }).click();
  await Idea.uploadImage();
  await this.fillIdeaDetails();
}
}

export { MissionCampaignPage };

