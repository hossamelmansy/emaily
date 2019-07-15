const Mailer = require('@sendgrid/mail');
Mailer.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function sendMail({ subject, recipients }, content) {
  await Mailer.sendMultiple({
    to: recipients.map(({ email }) => ({ email })),
    from: 'no-reply@emaily.com',
    subject,
    html: content,
    trackingSettings: { clickTracking: { enable: true } }
  });
};
