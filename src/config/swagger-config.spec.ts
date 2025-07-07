import { swaggerConfig } from '../../src/config/swagger-config';

describe('Swagger Config', () => {
  it('should have correct title, description and version', () => {
    expect(swaggerConfig.info.title).toBe('Backend Api');
    expect(swaggerConfig.info.description).toBe('Backend all api, router, data type and all.');
    expect(swaggerConfig.info.version).toBe('V.1.0');
  });

//   it('should define Bearer Auth scheme', () => {
//     expect(swaggerConfig.components?.securitySchemes?.Authorization).toBeDefined();
//     expect(swaggerConfig.components.securitySchemes.Authorization).toEqual({
//       type: 'http',
//       scheme: 'bearer',
//       bearerFormat: 'JWT',
//       description: 'Enter Bearer token in the format: Bearer <token>',
//       in: 'header',
//     });
//   });

  it('should include contact information', () => {
    expect(swaggerConfig.info.contact).toEqual({
      name: 'Support Team',
      url: '',
      email: 'imnikku11@gmail.com',
    });
  });
});
