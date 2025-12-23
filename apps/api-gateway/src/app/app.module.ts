import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service'; // <--- Import

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService], // <--- Ajoutez-le ici
})
export class AppModule {}