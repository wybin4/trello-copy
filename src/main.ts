import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('Trello copy')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Отфильтровывает поля, которые отсутствуют в DTO
    forbidNonWhitelisted: true, // Запрещает поля, которых нет в DTO
    transform: true, // Автоматически преобразует типы данных
    transformOptions: {
      enableImplicitConversion: true, // Включает автоматическое преобразование типов
    },
  }));
  
  const port = new ConfigService().get('SERVICE_PORT');
  await app.listen(port);
}
bootstrap();
