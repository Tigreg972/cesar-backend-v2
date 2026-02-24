import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { PermissionsGuard } from '../../core/permissions/permissions.guard';
import { RequirePermissions } from '../../core/permissions/require-permissions.decorator';
import { USER_ROLE_UPDATE } from '../../core/permissions/permissions';

import { SetRoleDto } from './dto/set-role.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Patch('role')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(USER_ROLE_UPDATE)
  setRole(@Body() dto: SetRoleDto) {
    return this.users.setRole(dto.userId, dto.role);
  }
}