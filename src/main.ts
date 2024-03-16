import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { addSwaggerApiDocumentation } from 'src/utils/addSwaggerApiDoc';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.SERVER_PORT || 5002;
  const app = await NestFactory.create(AppModule);
  addSwaggerApiDocumentation(app);
  await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
}
bootstrap();
