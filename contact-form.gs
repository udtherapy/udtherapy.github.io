const RECIPIENT = 'beth@udtherapy.com';
const CONTACT_PAGE = 'https://udtherapy.com/contact.html';

function doPost(e) {
  const fields = e && e.parameter;
  if (!fields) {
    return responsePage('Unable to send message', 'Please return to the contact page and try again.');
  }

  const firstName = String(fields.firstName || '').trim();
  const lastName = String(fields.lastName || '').trim();
  const email = String(fields.email || '').trim();
  const message = String(fields.message || '').trim();

  if (
    !firstName ||
    !lastName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    firstName.length > 100 ||
    lastName.length > 100 ||
    email.length > 254 ||
    message.length > 4000
  ) {
    return responsePage('Unable to send message', 'Please check the form fields and try again.');
  }

  MailApp.sendEmail({
    to: RECIPIENT,
    replyTo: email,
    subject: 'New contact form message',
    body: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
  });

  return responsePage('Thank you for reaching out', 'Your message has been sent. We will be in touch within 24 hours.');
}

function responsePage(title, message) {
  return HtmlService.createHtmlOutput(
    `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title} | Urban Dandelion Therapy</title>
        <style>
          body { font: 16px/1.6 Arial, sans-serif; color: #17364b; margin: 0; padding: 3rem 1rem; background: #f7f3ef; }
          main { max-width: 36rem; margin: 0 auto; padding: 2rem; background: white; border-radius: 1rem; }
          a { color: #17364b; }
        </style>
      </head>
      <body>
        <main>
          <h1>${title}</h1>
          <p>${message}</p>
          <a href="${CONTACT_PAGE}">Return to the contact page</a>
        </main>
      </body>
    </html>`
  ).setTitle(`${title} | Urban Dandelion Therapy`);
}
