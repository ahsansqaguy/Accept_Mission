export class VerifyEmailPage {
    constructor(page, options = {}) {
        this.page = page;
        this.iframeBody = options.iframeBody || '#msg_body';
        this.confirmationText = options.confirmationText || '//div[text()="Your email address has been successfully confirmed."]';
        this.resetPasswordLinkText = options.resetPasswordLinkText || 'RESET PASSWORD';
        this.emailSubjectLocator = options.emailSubjectLocator || 'td.ng-binding:has-text("Accept Mission")';
        this.linksTabLocator = options.linksTabLocator || 'text=LINKS';
        this.confirmAccountLinkLocator = options.confirmAccountLinkLocator || 'tr:has-text("CONFIRM ACCOUNT") a';
    }

    async loginAndVerifyConfirmationEmail(emailPrefix) {
        const encodedEmail = encodeURIComponent(emailPrefix);
        await this.page.goto(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${encodedEmail}`);
        await this.page.click(this.emailSubjectLocator);
        await this.page.waitForTimeout(8000);
        await this.page.click(this.linksTabLocator);
        const confirmationLink = await this.page.locator(this.confirmAccountLinkLocator).first().getAttribute('href');
        if (confirmationLink) {
            await this.page.goto(confirmationLink);
               return this.page
        } else {
            throw new Error("Confirmation link not found.");
        }
    }

    async loginIntoEmailToResetPassword(emailPrefix) {
        await this.page.goto(`https://www.mailinator.com/v4/public/inboxes.jsp?to=${emailPrefix}`);
        await this.page.waitForSelector(this.emailSubjectLocator, { timeout: 30000 });
        await this.page.click(this.emailSubjectLocator);

        const frame = await this.page.frameLocator(this.iframeBody);
        const resetLink = await frame.locator(`a:has-text("${this.resetPasswordLinkText}")`).getAttribute('href');

        const [resetPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.evaluate((url) => window.open(url, '_blank'), resetLink)
        ]);
        await resetPage.waitForLoadState();
        return resetPage;
    }
}