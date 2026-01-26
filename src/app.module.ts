import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './contexts/auth/auth.module';
import { UsersModule } from './contexts/users/users.module';
import { RoomsModule } from './contexts/rooms/rooms.module';
import { ClassesModule } from './contexts/classes/classes.module';
import { ReservationsModule } from './contexts/reservations/reservations.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
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
      }),
    }),

    AuthModule,
    UsersModule,
    RoomsModule,
    ClassesModule,
    ReservationsModule,
  ],
})
export class AppModule {}
