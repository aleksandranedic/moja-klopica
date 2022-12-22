import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin.entity';
import { User } from 'src/users/entities/user.entity';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class OptionsService {
  @Inject(ConfigService)
  private static readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log('TYPEORM ' + OptionsService.config);
    return {
      type: 'postgres',
      host: OptionsService.config.get<string>('DATABASE_HOST'),
      port: OptionsService.config.get<number>('DATABASE_PORT'),
      database: OptionsService.config.get<string>('DATABASE_NAME'),
      username: OptionsService.config.get<string>('DATABASE_USER'),
      password: OptionsService.config.get<string>('DATABASE_PASSWORD'),
      entities: [User, Admin],
      autoLoadEntities: true,
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: OptionsService.config.get<boolean>('DATABASE_SYNCHRONIZE'), // never use TRUE in production!
    };
  }

  public static createEmailOptions() {
    console.log(OptionsService.config);
    return {
      transport: {
        host: OptionsService.config.get<string>('MAIL_HOST'),
        secure: false,
        auth: {
          user: OptionsService.config.get<string>('MAIL_USER'),
          pass: OptionsService.config.get<string>('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: `"No Reply" <${OptionsService.config.get<string>('MAIL_FROM')}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    };
  }
}
