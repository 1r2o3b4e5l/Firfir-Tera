import {
  Controller,
  Param,
  Body,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';

import { User } from '../schemas/user.schema';
import { updateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/entities/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getById(@Param('id') userId: string): Promise<User> {
    return this.userService.getById(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
  ) {
    try {
      this.userService.updateById(userId, firstName, lastName, email);
    } catch {
      throw new Error('could not update user');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<User> {
    return this.userService.deleteById(userId);
  }

  // this route only work for admin
  @Get()
  @Roles(Role.ADMIN)
  async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Patch('/changeRole')
  @Roles(Role.ADMIN)
  async updateRole(@Body('Userid') userId: string, @Body('role') role: string) {
    try {
      this.userService.changeRole(userId, role);
    } catch {
      throw new Error('could not update role');
    }
  }
}
