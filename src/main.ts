import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('aws_access_key_id'),
    secretAccessKey: configService.get('aws_access_key'),
    region: configService.get('aws_region'),
  });
  await app.listen(8000);
}
bootstrap();
