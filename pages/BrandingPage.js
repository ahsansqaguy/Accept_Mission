// pages/Branding.js
import path from 'path';

class BrandingPage {
  constructor(page) {
    this.page = page;
    this.settings = page.locator("xpath=//a[@href='/settings']//div[@class='card-content']");
    this.branding = page.locator("//a[@href='/settings/branding']//div[@class='card-content']");
    this.squareImage = page.locator("//input[@id='square_image']");
    this.colorPicker = page.locator("//input[@id='hexcolors']");
    this.saveBranding = page.locator("//a[normalize-space()='Save']");
    this.resetBranding = page.locator("//a[normalize-space()='Reset']");
  }

  async navigateToSettings() {
    await this.settings.click();
  }

  async BrandingCompany() {
    await this.branding.click();
    // await this.squareImage.click();
    const imagePath = path.resolve('tests/files/STAMP.jpeg');
    await this.squareImage.setInputFiles(imagePath);  
    
    await this.colorPicker.click();
    await this.colorPicker.fill('#9c9696ff')
    await this.page.waitForTimeout(500);
    await this.saveBranding.click();
    await this.page.waitForTimeout(3000); 
  }
  async ResetBrandingCompany(){
    await this.branding.click();
    await this.resetBranding.click();
  }
}

export { BrandingPage };

