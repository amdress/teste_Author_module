import { Module } from '@nestjs/common';

//TODO: Imports necesarios
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule
  ],
  providers: [
    UserService,
    RolesService
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
