import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { graphqlUploadExpress } from 'graphql-upload';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.use(graphqlUploadExpress({ maxFileSize: 5000000, maxFiles: 10 }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.listen(3000);
}
bootstrap();
