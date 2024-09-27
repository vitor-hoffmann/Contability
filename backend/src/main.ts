import { NestFactory } from '@nestjs/core';
import { AppModule } from './models/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://192.168.1.8:3000',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
