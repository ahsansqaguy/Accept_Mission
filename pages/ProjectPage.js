const path = require('path');
const fs = require('fs');
const { FunnelPage } = require('./FunnelPage');
const { IdeaPage } = require('./IdeaPage');

const dataFilePath = path.resolve(__dirname, '../data/data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

class ProjectPage {
  constructor(page) {
    this.page = page;

    const randomSuffix = Math.random().toString(36).substring(2, 8); // e.g., "f9a7e3"
    this.projectTitle = `AutoProject-${randomSuffix}`;

    // Image upload
    this.editImageButton = page.locator('div').filter({ hasText: /^Edit image$/ }).nth(2);
    this.fileInput = page.locator("//input[@type='file' and contains(@class, 'file_input')]");
    this.saveSelectionButton = page.locator("//button[normalize-space()='Save selection']");

    // Project title
    this.projectTitleField = page.locator('#project-title-field');

    // Team section
    this.teamTab = page.getByRole('button', { name: 'Team' });
    this.addTeamMember = page.getByRole('link', { name: 'Add Team Member' });
    this.selectMemberDropdown = page.getByText('Select', { exact: true });
    this.memberSuggestion = page.locator('[role="option"]')
    this.selectRole = page.getByRole('button', { name: 'Select innovation roles' });
    this.roleSuggestion = page.getByLabel('Suggestions').getByText('Idea Owner');
    this.addRoleButton = page.getByRole('button', { name: 'Add', exact: true });

    // Add Idea
    this.linkFilesTab = page.getByRole('button', { name: 'Link / Files' });
    this.addLinkButton = page.getByRole('link', { name: 'Add Link' });
    this.titleInput = page.locator('#attachment_name_attachment')
    this.urlInput = page.getByPlaceholder('Full link to the file');
    this.confirmAddLinkButton = page.getByRole('button', { name: 'Add Link' });
    this.url='https://automationqa-7082.acceptmission.com/studio/projects/1/kanban'

    // Time Tracking
    this.hoursText = page.getByText('Hours');
    this.timeTrackingBtn = page.getByRole('button', { name: 'Time Tracking' });
    this.hoursOption = page.getByRole('option', { name: '5', exact: true });
    this.minsText = page.getByText('Mins');
    this.minsOption = page.getByRole('option', { name: '15' });

    // Finance
    this.revenueField = page.locator('#project_revenue');
    this.costsField = page.locator('#project_costs');
    this.budgetTotalField = page.locator('#project_budget_total');
    this.budgetSpendField = page.locator('#project_budget_spend');
    this.financeTab = page.getByRole('button', { name: 'Finance' });

    // Details tab
    this.detailsTab = page.locator("//span[normalize-space()='Details']");
    this.ideaDatePicker = page.locator("(//span[normalize-space()='Pick a date'])[1]");
    this.todayBtn = page.locator("//button[normalize-space()='Today']");
    this.projectProgress = page.locator('#project_progress');
    this.departmentSelect = page.getByText('Select Department');
    this.departmentOption = page.getByRole('option', { name: 'General' });
    this.categoriesBtn = page.getByRole('button', { name: 'Select categories' });
    this.categoryOption = page.getByRole('option', { name: 'General' });
    this.reasonsBtn = page.getByRole('button', { name: 'Select Reasons' });
    this.reasonSuggestion = page.getByLabel('Suggestions').getByText('No priority');
    this.innovationTypeSelect = page.getByText('Select Type');
    this.innovationTypeOption = page.getByText('test', { exact: true });

    // Final Save
    this.saveButton = page.locator('button.js-create-project-admin.save_and_stay');
  }

  async SetImage() {
    const filePath = path.resolve(__dirname, '../tests/files/Project.png');
    await this.editImageButton.click();
    await this.fileInput.setInputFiles(filePath);
    await this.saveSelectionButton.click();
  }

  async Projectdetails() {
    await this.projectTitleField.click();
    console.log('Project Title', this.projectTitle); 
    await this.projectTitleField.fill(this.projectTitle);

    if (!(await this.addTeamMember.isVisible())) {
      await this.teamTab.click();
    }

    await this.addTeamMember.click();
    await this.selectMemberDropdown.click();

    await this.memberSuggestion.first().click();;
    await this.selectRole.click();
    await this.roleSuggestion.click();
    await this.addRoleButton.click();
 
    // Add Link/Files
     if (!(await this.addLinkButton.isVisible())) {
      await this.linkFilesTab.click();
    }

    // await this.addLinkButton.click();
    // await this.titleInput.fill('My Test Title');
    // await this.urlInput.fill(this.url);
    // await this.confirmAddLinkButton.click();

    // Time Tracking
    if (!(await this.hoursText.isVisible())) {
      await this.timeTrackingBtn.click();
    }
    await this.hoursText.click();
    await this.hoursOption.click();
    await this.minsText.click();
    await this.minsOption.click();

    // Finance
    if (!(await this.revenueField.isVisible())) {
      await this.financeTab.click();
    }

    await this.revenueField.fill('50000');
    await this.costsField.fill('5000');
    await this.budgetTotalField.fill('20000');
    await this.budgetSpendField.fill('14999');
  }

  async DetailsSection() {
    await this.detailsTab.click();
    await this.ideaDatePicker.click();
    await this.todayBtn.click();
    await this.projectProgress.fill('47');
    await this.departmentSelect.click();
    await this.departmentOption.click();
    await this.categoriesBtn.click();
    await this.categoryOption.click();
    await this.reasonsBtn.click();
    await this.reasonSuggestion.click();
    await this.innovationTypeSelect.click();
    await this.innovationTypeOption.click();
  }

  async VerifyProjectDetails() {
  await this.page.getByRole('link', { name: 'Projects' }).click();
  await this.page.getByRole('link', { name: this.projectTitle }).click();

  // Now verify the fields one by one
  const titleFieldValue = await this.projectTitleField.inputValue();
  if (titleFieldValue !== this.projectTitle) {
    throw new Error(`Title mismatch! Expected: ${this.projectTitle}, Found: ${titleFieldValue}`);
  }

  const revenueValue = await this.revenueField.inputValue();
  if (revenueValue !== '50000') {
    throw new Error(`Revenue mismatch! Expected: 50000, Found: ${revenueValue}`);
  }

  const costValue = await this.costsField.inputValue();
  if (costValue !== '5000') {
    throw new Error(`Cost mismatch! Expected: 5000, Found: ${costValue}`);
  }

  const progressValue = await this.projectProgress.inputValue();
  if (progressValue !== '47') {
    throw new Error(`Progress mismatch! Expected: 47, Found: ${progressValue}`);
  }

  console.log('Project details verified successfully.');
}

// async EditProject() {
//   // Update Project Title
//   const updatedTitle = `${this.projectTitle}-Edited`;
//   await this.projectTitleField.fill(updatedTitle);
//   this.projectTitle = updatedTitle;

//   // Team section
//   if (!(await this.addTeamMember.isVisible())) {
//     await this.teamTab.click();
//   }
//   await this.addTeamMember.click();
//   await this.selectMemberDropdown.click();
//   await this.memberSuggestion.click();
//   await this.selectRole.click();
//   await this.roleSuggestion.click();
//   await this.addRoleButton.click();

//   // Link/Files section
//   if (!(await this.addLinkButton.isVisible())) {
//     await this.linkFilesTab.click();
//   }
//   await this.addLinkButton.click();
//   await this.titleInput.fill('Edited Test Title');
//   await this.urlInput.fill(`${this.url}?edited=true`);
//   await this.confirmAddLinkButton.click();

//   // Time Tracking
//   if (!(await this.hoursText.isVisible())) {
//     await this.timeTrackingBtn.click();
//   }
//   await this.hoursText.click();
//   await this.hoursOption.click(); // e.g., 5 hours
//   await this.minsText.click();
//   await this.minsOption.click(); // e.g., 15 mins

//   // Finance section
//   if (!(await this.revenueField.isVisible())) {
//     await this.financeTab.click();
//   }
//   await this.revenueField.fill('75000');
//   await this.costsField.fill('8000');
//   await this.budgetTotalField.fill('30000');
//   await this.budgetSpendField.fill('25000');

//   // Details section
//   await this.detailsTab.click();
//   await this.ideaDatePicker.click();
//   await this.todayBtn.click();
//   await this.projectProgress.fill('88');
//   await this.departmentSelect.click();
//   await this.departmentOption.click();
//   await this.categoriesBtn.click();
//   await this.categoryOption.click();
//   await this.reasonsBtn.click();
//   await this.reasonSuggestion.click();
//   await this.innovationTypeSelect.click();
//   await this.innovationTypeOption.click();

//   // Final Save
//   await this.saveButton.click();
// }



  async CreateProject() {
    const Funnel = new FunnelPage(this.page);
    const Idea = new IdeaPage(this.page);
    await this.page.getByRole('link', { name: 'Projects', exact: true }).click();
    await this.page.getByRole('link', { name: 'add Add project' }).click();
    await this.SetImage();
    await this.Projectdetails();
    // await Idea.addFile();
    await this.DetailsSection();
    await Idea.AddComment();
    await Idea.AddTask();
    await this.saveButton.click();
    await this.page.getByRole('link', { name: 'Projects' }).click();
   await this.page.getByRole('link', { name: this.projectTitle }).click();

  }
}

module.exports = { ProjectPage };