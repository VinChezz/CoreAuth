import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('deletion')
  getDeletionPage(@Res() res: Response) {
    res.send(`
    <html>
      <head>
        <title>Account Deleted</title>
      </head>
      <body>
        <h1>Your account has been successfully deleted</h1>
      </body>
    </html>
  `);
  }
  @Get('privacy-policy')
  getPrivacyPage(@Res() res: Response) {
    res.send(`
    <html>
      <head>
        <title>Privacy policy</title>
      </head>
      <body>
        <h1>Data Privacy Policy</h1>
      </body>
    </html>
  `);
  }
  @Get('terms')
  getTermsPage(@Res() res: Response) {
    res.send(`
    <html>
      <head>
        <title>Terms</title>
      </head>
      <body>
        <h1>Our conditions</h1>
      </body>
    </html>
  `);
  }
}
