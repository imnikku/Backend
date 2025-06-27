import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Backend Api')
  .setDescription('Backend all api, router, data type and all.')
  .setVersion('V.1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter Bearer token in the format: Bearer <token>',
      in: 'header', 
    },
    'Authorization', // Name of the security scheme
  )
  .setContact('Support Team', '', 'imnikku11@gmail.com')
  .build();
