import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, swaggerConfig, { extraModels: [] });
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    },
  });
  await app.listen(process.env.PORT ?? 5000);
}

// Unhandled Rejection
process.on('unhandledRejection',(reason:unknown,promise:Promise<unknown>)=>{
  console.log('1st',reason,promise)
})


// Uncaught Exception
process.on('uncaughtException',(error:Error)=>{
  console.log('2nd',error)
})
bootstrap();
