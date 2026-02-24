import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.get<string>('DB_HOST') || '127.0.0.1',
  port: Number(config.get<string>('DB_PORT') || 3306),
  username: config.get<string>('DB_USERNAME') || 'root',
  password: config.get<string>('DB_PASSWORD') || '',
  database: config.get<string>('DB_DATABASE') || 'cesar_backend',

  synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
  logging: config.get<string>('DB_LOGGING') === 'true',

  autoLoadEntities: true,
  charset: 'utf8mb4',
});
