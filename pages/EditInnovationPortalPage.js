import fs from 'fs';
import path from 'path';
const { expect } = require('@playwright/test');

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

class EditInnovationPortal {
  constructor(page) {
    this.page = page;

    this.editPageLink = page.getByRole('link', { name: 'Edit page' });
    this.headerTitleInput = page.locator('#company_header_title');
    this.headerSubtitleInput = page.locator('#company_header_subtitle');
    this.firstDropdown = page.locator('.select-dropdown').first();
    this.supportAcceptOption = page.locator('span', { hasText: 'Support Accept Mission' });
    this.submitIdeaColorInput = page.locator('input[name="header_color\\[submit_idea_btn\\]"]');
    this.submitIdeaColorPalette = page.locator('div', { hasText: /^SUBMIT IDEA button$/ }).locator('#hexcolors');
    this.quoteTextIframe = page.frameLocator('#company_header_quote_text_ifr');
    this.quoteTextHtml = this.quoteTextIframe.locator('html');
    this.quoteTextArea = this.quoteTextIframe.getByLabel('Rich Text Area. Press ALT-0');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.introductionTab = page.locator('a[href="#introtab"]');
    this.missionsTab = page.locator('a[href="#missionstab"]');
    this.allIdeasTab = page.locator('a[href="#allideastab"]');
    this.allProjectsTab = page.locator('a[href="#allprojectstab"]');
    this.departmentsTab = page.locator('a[href="#departmentstab"]');
    this.categoriesTab = page.locator('a[href="#categoriestab"]');
    this.goalsTab = page.locator('a[href="#showgoalstab"]');
    this.trendingTagsTab = page.locator('a[href="#trendingtabstab"]'); 
    this.tasksTab = page.locator('a[href="#taskstab"]');

    this.rightArrow = page.locator('#right-arrow');
    this.leftArrow = page.locator('#left-arrow');
    this.missionsHandle = page.locator('tr#home_mission .drag-icon');
    this.introHandle = page.locator('tr#home_intro .drag-icon');
    
  }

  getRandomHexColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, '0')}`;
    
  }

  async EditAndSaveInnovationPortal() {
// const initialTabOrder = await this.page.$$eval(
//   '#sortable_home_tabs tr',
//   rows => rows.map(row => row.getAttribute('id'))
// );

// console.log('Initial Tab Order:', initialTabOrder);
const randomColor = this.getRandomHexColor();
    await this.editPageLink.click();
    await this.headerTitleInput.fill('AutomationTest');
    await this.headerSubtitleInput.fill('Test Subtitle');
    await this.firstDropdown.click();
    await this.supportAcceptOption.click();
    await this.submitIdeaColorPalette.click();
    await this.submitIdeaColorPalette.fill(randomColor);
    await this.quoteTextHtml.click();
    await this.quoteTextArea.fill('We are Creating a Unique Product');
    await this.saveButton.click();
   const introLocator = this.page.locator('tr#home_intro');
   const missionLocator = this.page.locator('tr#home_mission');
   const introY = (await introLocator.boundingBox())?.y || 0;
   const missionY = (await missionLocator.boundingBox())?.y || 0;
   if (missionY > introY) {
    await this.page.locator('tr#home_mission .drag-icon').dragTo(introLocator);
  }
  else if (introY > missionY) {
    await this.page.locator('tr#home_intro .drag-icon').dragTo(missionLocator);
  }
    await this.saveButton.click();
    await this.AddAndRemoveTabs();

  await this.page.waitForLoadState('networkidle');
// const newOrder = await this.page.locator('#sortable_home_tabs tr').evaluateAll(rows =>
//   rows.map(row => row.id)
// ); 
//  console.log('New Tab Order:', newOrder);
// expect(newOrder).toEqual(swappedOrder);

  }

async AddAndRemoveTabs() {
const toggle = this.page.locator('#company_item_visibility_missions');
const isChecked = await toggle.isChecked();

if (isChecked) {
  await this.page.getByRole('row', { name: 'menu Missions' }).locator('span').click();
}
  await this.saveButton.click();
  await this.page.goto(data.PagesUrl.InnovationPortal);
  expect(await this.missionsTab.isVisible()).toBeFalsy();
  await this.editPageLink.click();

if (!isChecked) {
  await this.page.getByRole('row', { name: 'menu Missions' }).locator('span').click();
}
  await this.saveButton.click();
  await this.page.goto(data.PagesUrl.InnovationPortal);
  await this.page.reload();
  // await expect(this.missionsTab).toBeVisible();
}
}

export { EditInnovationPortal };

