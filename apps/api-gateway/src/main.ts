// apps/api-gateway/src/main.ts (Version corrigée et unique)

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Préfixe global
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // --- Configuration Swagger (OpenAPI) ---
  const config = new DocumentBuilder()
    .setTitle('Audit Tool API')
    .setDescription('API de gestion des audits de cybersécurité (NIS 2)')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Audit', 'Gestion des scans et rapports')
    .addTag('Compliance', 'Calcul des scores NIS 2')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  // L'interface sera accessible sur /api/docs
  SwaggerModule.setup('api/docs', app, document);
  // ----------------------------------------

  const port = process.env.PORT || 3000; // Correction du pipe '|' en '||'
  await app.listen(port);
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `📑 Swagger Documentation is available on: http://localhost:${port}/api/docs`
  );
}

bootstrap();