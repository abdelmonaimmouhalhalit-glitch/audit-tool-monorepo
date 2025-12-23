import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const logger = new Logger('Bootstrap');
  
  logger.log('🚀 Worker GitHub est prêt et à l’écoute du réseau Docker');
  // Ici, le worker peut soit écouter une file de message (Redis), 
  // soit simplement attendre des commandes internes.
}
bootstrap();