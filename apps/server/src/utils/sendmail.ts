import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-connection';
import Mail from 'nodemailer/lib/mailer';

export default class MailSender {
  private static instance: Mail;

  private static async getTestMailConfig(): Promise<Options> {
    const testAccount = await nodemailer.createTestAccount();
    return {
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    };
  }

  private static async getMailConfig(): Promise<Options> {
    return {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT!, 10),
      secure: process.env.MAIL_SECURE === 'true',
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
    };
  }

  public static async init() {
    const config =
      process.env.NODE_ENV !== 'production'
        ? await this.getTestMailConfig()
        : await this.getMailConfig();
    this.instance = nodemailer.createTransport(config);
  }

  public static async send(options: Mail.Options) {
    const info = await this.instance.sendMail(options);
    return nodemailer.getTestMessageUrl(info);
  }
}
