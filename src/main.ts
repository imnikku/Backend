import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger-config';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './shared/exception/custome-exception-filter';
import { ResponseInterceptor } from './shared/response/response-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalFilters(new CustomExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  const document = SwaggerModule.createDocument(app, swaggerConfig, { extraModels: [] });
  SwaggerModule.setup('/api', app, document, {swaggerOptions: {persistAuthorization: true}});
  await app.listen(process.env.PORT ?? 5000);
}

// Unhandled Rejection
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.log('1st', reason, promise)
})


// Uncaught Exception
process.on('uncaughtException', (error: Error) => {
  console.log('2nd', error)
})
bootstrap();
