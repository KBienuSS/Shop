import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('*')
  serveApp(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'));
  }
}