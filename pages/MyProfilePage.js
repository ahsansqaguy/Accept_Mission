const path = require('path');
const fs = require('fs');
const { expect } = require('@playwright/test');

class MyProfile {
  constructor(page) {
    this.page = page;
    this.settings = page.locator("xpath=//a[@href='/settings']//div[@class='card-content']");
    this.titleIcon = page.locator("xpath=//a[@href='/studio/profile']//div[@class='card-content']//div[@class='title-icon']");
    this.EditProfile = page.locator("xpath=//a[normalize-space()='Edit']");
    this.profileImage = page.locator("//img[@class='user-profile-image-view img-position']"); 
    this.imageInput = page.locator('xpath=//input[@id="user_image"]');
    this.saveImage = page.locator("//span[normalize-space()='SAVE']");
    this.FirstName = page.locator("//input[@id='user_first_name']");
    this.LastName = page.locator("//input[@id='user_last_name']");
    this.AddSkill = page.locator("//input[@id='fname']");
    this.updateProfilebtn = page.locator("//span[normalize-space()='Update Profile']");
  }

  async navigateToSettings() {
    await this.settings.click();
  }

  async clickProfileIcon() {
    await this.titleIcon.click();
    await this.EditProfile.click();
  }

  async UploadImage(imageFilePath) {
    await this.profileImage.click();
    await this.imageInput.setInputFiles(imageFilePath);
    await this.page.waitForTimeout(5000);
    await this.saveImage.click();
    await this.page.waitForTimeout(3000);
  }

  async UpdateProfile() {
  await this.FirstName.click();
  await this.FirstName.fill('Muhammad SQA');

  await this.LastName.click();
  await this.LastName.fill('Super Admin');

  await this.AddSkill.fill('Playwright with JS');
  await this.page.waitForTimeout(500);
  await this.AddSkill.press('Enter');

  await this.updateProfilebtn.click();
}

}

module.exports = { MyProfile };
