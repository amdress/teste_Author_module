import { IsEmail, IsString, MinLength } from 'class-validator';

// Clase para validar los datos del formulario al hacer login
export class LoginDto {

    @IsEmail({}, { message: 'Debe proporcionar un email válido.' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;
}

