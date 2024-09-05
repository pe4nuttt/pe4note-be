import { Module, Provider } from '@nestjs/common';
import { Hocuspocus, Server } from '@hocuspocus/server';
import { PrismaService } from '../prisma/prisma.service';
import { Database } from '@hocuspocus/extension-database';

export const HocuspocuImpl = Symbol('HocuspocuImpl');

const HocuspocusProvider: Provider = {
  provide: HocuspocuImpl,
  useFactory: (prisma: PrismaService) => {
    const hocuspocus = new Hocuspocus({
      port: parseInt(process.env.HOCUS_POCUS_PORT) || 80,
      debounce: 3000,
      timeout: 30000,
      maxDebounce: 10000,
    });

    hocuspocus.configure({
      extensions: [
        new Database({
          fetch: async ({ documentName }) => {
            return new Promise((resolve, reject) => {});
          },
          store: async ({ documentName, state }) => {},
        }),
      ],
    });

    return hocuspocus;
  },
  inject: [PrismaService],
};

@Module({
  providers: [HocuspocusProvider],
  exports: [HocuspocusProvider],
})
export class HocuspocusModule {}
