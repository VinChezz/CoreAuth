import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('deletion')
  getDeletionPage(@Res() res: Response) {
    res.status(200).send(`
      <h1>Facebook User Data Deletion</h1>
      <p>If you want to delete your data, please contact support@example.com or remove the app from your Facebook settings.</p>
    `);
  }
}
