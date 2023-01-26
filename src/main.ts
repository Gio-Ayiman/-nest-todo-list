import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
            .setTitle('Todo API')
            .setDescription('The Todo API with NestJS')
            .setVersion('1.0')
            .addTag('todos')
            .addSecurity("OAuth", {
              type: "oauth2",
              name: "OAuthSecurityScheme",
              description: "Authentification aux API de TodoApp",
              flows: {password: {tokenUrl: configService.get('OIDC_TOKEN_URL'), scopes: {["write"] : "todo"}}}
            })
            .build()

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
