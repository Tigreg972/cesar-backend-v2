import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendMail(options: { to: string; subject: string; html: string }) {
    return this.transporter.sendMail({
      from: `"CESAR" <${process.env.MAIL_USER}>`,
      ...options,
    });
  }
}