import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('app.port');

  await app.listen(APP_PORT);
}
bootstrap();
