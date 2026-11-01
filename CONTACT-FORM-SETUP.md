# Contact form setup

The site is static, so the contact form needs a Google Apps Script Web App to send email.

1. Sign in to the Google account that should send contact notifications and create a project at [script.google.com](https://script.google.com/).
2. Replace the editor contents with `contact-form.gs` from this repository and save.
3. Select **Deploy > New deployment**, choose **Web app**, set **Execute as** to your account, and set access to **Anyone** so site visitors can submit without signing in.
4. Deploy, authorize the requested email permission, and copy the Web App URL ending in `/exec`.
5. In `contact.html`, set `data-contact-endpoint=""` on the contact form to the copied URL, for example `data-contact-endpoint="https://script.google.com/macros/s/DEPLOYMENT_ID/exec"`.
6. Submit a test message from the published site and confirm it arrives at `beth@udtherapy.com`. Redeploy the Apps Script as a new version after changing its code.

The script emails the first and last name, any email address and phone number provided, preferred contact method, selected callback time windows, and complete message to the fixed recipient; it does not save submissions in a spreadsheet or database. A valid email address or phone number is required, but visitors may provide either one or both. Visitors may select multiple time windows or choose **Anytime**. After changing `contact-form.gs`, publish a new Apps Script deployment version so the live endpoint uses the updated fields and validation.

The Apps Script endpoint is public, so monitor the inbox for spam. Confirm that your Google account and configuration are appropriate for the information you collect, including any required Workspace/BAA arrangements. The form also asks visitors not to include detailed health information or anything they would prefer not to send by email.
