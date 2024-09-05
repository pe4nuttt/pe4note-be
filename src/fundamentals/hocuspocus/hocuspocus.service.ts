// import {
//   Injectable,
//   OnApplicationBootstrap,
//   OnApplicationShutdown,
// } from '@nestjs/common';
// import { Hocuspocus } from '@hocuspocus/server';

// @Injectable()
// export class HocuspocusService
//   implements OnApplicationBootstrap, OnApplicationShutdown
// {
//   readonly server: Hocuspocus = new Hocuspocus({
//     port: parseInt(process.env.HOCUS_POCUS_PORT) || 80,
//     debounce: 3000,
//     timeout: 30000,
//     maxDebounce: 10000,
//   });

//   constructor() {}

//   onApplicationBootstrap() {}

//   onApplicationShutdown(signal?: string) {
//     this.server.destroy();
//   }
// }
