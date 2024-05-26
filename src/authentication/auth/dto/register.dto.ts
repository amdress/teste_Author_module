import { IsEmail, IsString, MinLength } from 'class-validator';
// Clase para validar datos en el formulario de registro
export class RegisterDto {
    
    @IsString()
    @MinLength(1, { message: 'Debe proporcionar un nombre válido.' })
    name: string;

    @IsEmail({}, { message: 'Debe proporcionar un email válido.' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    password: string;
}