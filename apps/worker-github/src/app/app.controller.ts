import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('scan')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('github')
  async startScan(@Query('companyId') companyId: string) {
    // Si companyId n'est pas fourni, on utilise une valeur par défaut pour le dev
    const id = companyId || 'dev-company-id';
    return await this.appService.runGithubScan(id);
  }
}