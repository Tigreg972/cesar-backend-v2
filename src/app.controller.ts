import { Controller, Get } from '@nestjs/common';
import { MailerService } from './core/mailer/mailer.services';

@Controller()
export class AppController {
  constructor(private readonly mailer: MailerService) {}

  @Get('test-mail')
  async testMail() {
    await this.mailer.sendMail({
      to: process.env.MAIL_USER!,
      subject: 'Test CESAR',
      html: '<h2>Test OK</h2><p>Email envoyé ✅</p>',
    });

    return { ok: true };
  }
}