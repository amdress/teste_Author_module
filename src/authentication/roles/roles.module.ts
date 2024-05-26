import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

//TODO: Imports necesarios
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity'

@Module({
  imports:[
    TypeOrmModule.forFeature([Roles])
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [
    TypeOrmModule
  ]
})
export class RolesModule {}
