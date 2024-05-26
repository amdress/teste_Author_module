import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AuthorizationGuard } from './guards/authorization.guard';


@Module({
  imports: [
    AuthModule, 
    UserModule, 
    RolesModule,
   
  
  ],
  providers:[
  ],
  exports: [
 
  ]
})
export class AuthenticationModule {}
