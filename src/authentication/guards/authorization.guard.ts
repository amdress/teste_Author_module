import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../auth/constants/jwt.constants';
import { UserService } from '../user/user.service';


//TODO: este guar verifica que este autenticado se usa @UseGuards(AuthorizationGuard) sobre la classe
@Injectable()
export class AuthorizationGuard implements CanActivate {
  
  private readonly logger = new Logger(AuthorizationGuard.name);

  constructor (
    //TODO: para verificar el token
    private readonly jwtService: JwtService,
    //TODO : haciendo uso de los servicios de usuarios
    private readonly usersService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //TODO: accedemos al objeto contexto para extraer el token
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); // TODO:  metodo para verificar si existe token y lo extrae

    //TODO:  verificamos si exite un token
    if (!token) {
      this.logger.warn('Token no encontrado en el encabezado de autorización.');
      throw new UnauthorizedException('El usuario no tiene un token .');
    }


    //TODO:  decodificamos el token y vericamos si ese usuario existe en la base de datos 
    try {
      const decodedToken = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret });
      const userEmail = decodedToken.email;

      //TODO: espera por la promesa para obtener el usuario
      const user = await this.usersService.findOneByEmail(userEmail); // TODO : buscamos por email en la base de datos

     
      // //TODO: validamos si el usuario existe
      if (!user) {
        this.logger.warn('Usuario no encontrado en la base de datos.');
        throw new UnauthorizedException('Usuario no encontrado.');
      }
     

      // // TODO:  asignamos  entonces el usuario al constexto de la app
      request.user = { email: user.email, roles: user.roles };
      //  console.log('Datos para request:', JSON.stringify(request.user, null, 2));
      return true;

    } catch (error) {
      this.logger.error(`Error al verificar el token: ${error.message}`);
      throw new UnauthorizedException('El token proporcionado no es válido.');
    }

  }

  // TODO: metodo para sacar el token del headers
  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return undefined;
    }
    return token;
  }
}
