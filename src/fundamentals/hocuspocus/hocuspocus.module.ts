import { Module, Provider } from '@nestjs/common';
import { Hocuspocus, Server } from '@hocuspocus/server';
import { PrismaService } from '../prisma/prisma.service';
import { Database } from '@hocuspocus/extension-database';
import { DOCUMENT } from 'src/utils/constants';

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
            return new Promise(async (resolve, reject) => {
              (async () => {
                try {
                  const documentId = documentName.replace(DOCUMENT.PREFIX, '');

                  const document = await prisma.documents.findUnique({
                    where: {
                      id: documentId,
                    },
                  });

                  if (document) resolve(document.data);

                  reject('Document not existed');
                } catch (error) {
                  reject(error);
                }
              })();
            });
          },
          store: async ({ documentName, state }) => {
            try {
              const documentId = documentName.replace(DOCUMENT.PREFIX, '');

              await prisma.documents.update({
                where: {
                  id: documentId,
                },
                data: {
                  data: state,
                },
              });
            } catch (error) {}
          },
        }),
      ],
    });

    return hocuspocus;
  },
  inject: [PrismaService],
};

@Module({
  providers: [HocuspocusProvider, PrismaService],
  exports: [HocuspocusProvider],
})
export class HocuspocusModule {}
