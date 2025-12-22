import { Controller, Get } from '@nestjs/common';
import { AuditStatus } from '@audit-tool-monorepo/shared-types'; 

@Controller()
export class AppController {

  @Get('status')
  getAuditStatus(): AuditStatus {
    // On renvoie un objet qui respecte strictement notre interface partagée
    return {
      id: 'job-1234',
      status: 'RUNNING',
      score: 45
    };
  }
}