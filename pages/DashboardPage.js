import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
      this.page = page;
      this.ideasLocator = "(//span[text()='Ideas'])[2]"
      this.ideasInFunnel = '[data-funnel_id="1"]'
      this.projectsLocator = "(//span[text()='Projects'])[1]"
      this.projectsInFunnel = '[data-funnel_id="2"]'
  }

  async checkIdeasInFunnel() {
    await expect(this.page.locator(this.ideasLocator)).toBeVisible;
    await this.page.locator(this.ideasLocator).click();
    const ideaCount = await this.page.locator(this.ideasInFunnel).count();
    expect(ideaCount).toBeGreaterThan(0);
  }

  async checkProjectsInFunnel(){
    await expect(this.page.locator(this.projectLocator)).toBeVisible;
    await this.page.locator(this.projectsLocator).click();
    await this.page.waitForTimeout(30000)
    await this.page.reload();
    await this.page.waitForTimeout(30000)
    await this.page.reload();
    await this.page.locator(this.projectsLocator).click();
    const projectCount = await this.page.locator(this.projectsInFunnel).count();
    expect(projectCount).toBeGreaterThan(0);
  }



}
