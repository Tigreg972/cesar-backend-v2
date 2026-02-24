import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/user.service';
import { MailerService } from '../../core/mailer/mailer.services';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
    private readonly mailer: MailerService,
  ) {}

  async register(dto: any) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) throw new UnauthorizedException('User already exists');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.users.create({
      email: dto.email,
      username: dto.username,
      passwordHash: hash,
      role: dto.role || 'student',
      permissions: dto.permissions ?? '0',
    });

    await this.mailer.sendMail({
      to: user.email,
      subject: 'Bienvenue sur CESAR',
      html: `<h2>Bienvenue ${user.username}</h2><p>Compte créé </p>`,
    });

    return { id: user.id, email: user.email, username: user.username };
  }

  async login(dto: any) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwt.sign(payload);

    return {
      accessToken,
      user: { id: user.id, email: user.email, username: user.username, role: user.role },
    };
  }
}