import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SyncModule } from './core/sync/sync.module';
import { HocuspocusModule } from './fundamentals/hocuspocus/hocuspocus.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './fundamentals/prisma/prisma.module';
import { SupabaseModule } from './fundamentals/supabase/supabase.module';
import { AuthModule } from './core/auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SyncModule,
    HocuspocusModule,
    PrismaModule,
    SupabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
