import { DynamicModule, Global, Module } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

export const SupabaseClientImpl = Symbol('SupabaseClientImpl');
export const SupabaseAdminImpl = Symbol('SupabaseAdminImpl');
export const SupabaseAuthImpl = Symbol('SupabaseAuthImpl');

@Global()
@Module({})
export class SupabaseModule {
  static forRoot(options: {
    supabaseUrl: string;
    serviceRoleKey: string;
  }): DynamicModule {
    const supabaseClient = createClient(
      options.supabaseUrl,
      options.serviceRoleKey,
    );

    return {
      module: SupabaseModule,
      providers: [
        {
          provide: SupabaseClientImpl,
          useValue: supabaseClient,
        },
        {
          provide: SupabaseAdminImpl,
          useValue: supabaseClient.auth,
        },
        {
          provide: SupabaseAdminImpl,
          useValue: supabaseClient.auth.admin,
        },
      ],
    };
  }
}
