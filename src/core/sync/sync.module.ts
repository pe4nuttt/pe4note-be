import { Module } from '@nestjs/common';
import { SyncGateway } from './sync.gateway';
import { HocuspocusModule } from 'src/fundamentals/hocuspocus/hocuspocus.module';

@Module({
  imports: [HocuspocusModule],
  providers: [SyncGateway],
})
export class SyncModule {}
