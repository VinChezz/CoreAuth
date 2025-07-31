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
}
