import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { USERS_REPOSITORY } from './ports/users.repository.port';
import { UsersRepositoryTypeOrm } from './adapters/users.repository.typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'dev-secret',
        signOptions: {
          expiresIn: Number(config.get<string>('JWT_EXPIRES_IN') || 3600), // ✅ number
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: USERS_REPOSITORY, useClass: UsersRepositoryTypeOrm },
  ],
  exports: [AuthService],
})
export class AuthModule {}
