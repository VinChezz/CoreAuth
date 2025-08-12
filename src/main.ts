import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CoreAuth API')
    .setDescription('CoreAuth API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT || 3000;

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.use(cookieParser());

  await app.listen(port);
  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();
