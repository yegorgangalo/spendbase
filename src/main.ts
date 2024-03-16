import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.SERVER_PORT || 5002;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
}
bootstrap();
