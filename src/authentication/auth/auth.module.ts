import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//TODO: Imports necesarios
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    UserModule,

    //TODO: Config para el jwt
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d'}
    }),
    
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
