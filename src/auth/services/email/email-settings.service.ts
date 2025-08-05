import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailSettingsService {
  private readonly logger = new Logger(EmailSettingsService.name);
  private transporter: Transporter;
  constructor(private config: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.get('EMAIL_USER'),
        pass: config.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendEmail = async (to: string, subject: string, text: string) => {
    await this.transporter.sendMail({ to, subject, text });
    this.logger.log(`📤 Email sent to ${to} with subject "${subject}"`);
  };
}
