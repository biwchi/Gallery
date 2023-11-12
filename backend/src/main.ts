import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import path from 'path';

import * as fs from 'fs';

let appPort: number;

const appPrefix = 'api'
const docsPrefix = `${appPrefix}/docs`

const createUploadsDir = (directory: string) => {
  const uloadsDir = path.join(process.cwd(), directory);

  if (fs.existsSync(uloadsDir)) {
    fs.mkdirSync(uloadsDir);
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix(appPrefix);

  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  createUploadsDir(configService.get('FILE_STORAGE'));

  appPort = configService.get<number>('PORT');

  await app.listen(appPort);
}

bootstrap().then(() => {
  Logger.log(`Application started on port ${appPort}`, 'main');
  Logger.log(
    `API Documentation: http://localhost:${appPort}/${docsPrefix}`,
    'main',
  );
});
