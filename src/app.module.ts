import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './contexts/users/users.module';
import { RoomsModule } from './contexts/rooms/rooms.module';
import { ClassesModule } from './contexts/classes/classes.module';
import { ReservationsModule } from './contexts/reservations/reservation.module';
import { AuthModule } from './contexts/auth/auth.module';
import { ProfileModule } from './contexts/profile/profile.module';

import { EventModule } from './core/events/event.modules';
import { MailerModule } from './core/mailer/mailer.module';

import { NotesModule } from './contexts/notes/note.module';

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

    EventModule,
    MailerModule,
    UsersModule,
    RoomsModule,
    ClassesModule,
    ReservationsModule,
    AuthModule,
    ProfileModule,
    NotesModule,
  ],
})
export class AppModule {}