import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthorizationGuard } from '../guards/authorization.guard';

@Controller('users')
@UseGuards(AuthorizationGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

}
