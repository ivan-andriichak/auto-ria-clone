import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('АвтоРІА - clone')
    .setDescription('The АвтоРІА API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModulesExpandDepth: 2,
      persistAuthorization: true,
    },
  });

  await app.listen(3001, '0.0.0.0', () => {
    console.log('Server is running on port http://localhost:3001');
    console.log('Swagger is running on port http://localhost:3001/docs');
  });
}
void bootstrap();
