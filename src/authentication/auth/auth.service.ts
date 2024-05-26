import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';


//TODO: Imports necesarios para la auth
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

//TODO: para hash y encriptar
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor (
    private readonly userService: UserService,
    private readonly jwtService : JwtService

  ){}


  //TODO : Methods

  async login({ email, password }: LoginDto): Promise<{ token: string; email: string }> {
   
    // Validamos la existencia del usuario
    const userFound = await this.userService.findByEmailWithPassword(email);
    
    if (!userFound) {
      throw new UnauthorizedException("El usuario no existe en la base de datos.");
    }

    // Validamos la contraseña
    const isPasswordValid = await bcryptjs.compare(password, userFound.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña es incorrecta.');
    }

    // Si el usuario existe y sus credenciales son validadas, creamos un token
    const payload = { email: userFound.email, roles: userFound.roles }; // Lo que enviaremos en el token
    
    // Firmamos el token
    const token = await this.jwtService.signAsync(payload);

    // Retornamos el token y el correo electrónico
    return {
      token,
      email: userFound.email,
    };
  }


  async register({ name, email, password }: RegisterDto): Promise<{ name: string; email: string }> {
    
    // Validamos que no exista un usuario con este email en la base de datos
    const userFound = await this.userService.findOneByEmail(email);
    if (userFound) {
      throw new BadRequestException('El usuario ya existe en la base de datos');
    }

    // Hash de la contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Creamos el nuevo usuario
    await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
      role: '', // Puedes ajustar esto según tu lógica de roles
    });

    // Retornamos el nombre y el email del usuario
    return {
      name,
      email,
    };
  }
}
