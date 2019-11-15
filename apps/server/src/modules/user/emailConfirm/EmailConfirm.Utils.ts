import MailSender from '~/utils/sendmail';

export const sendConfirmationEmail = (email: string, url: string) => {
  MailSender.send({
    from: 'Form Site <no-reply@form-site.io>',
    to: email,
    subject: 'Confirmation Email | Form Site',
    html: `<a href="${url}">${url}</a>`,
    text: url
  });
};
