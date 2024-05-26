import { Injectable } from '@nestjs/common';

//TODO: Imports necesarios
import { User } from './entities/user.entity';
import { Roles } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {


  constructor(
    
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,

    @InjectRepository(Roles)
    private readonly roleRepository : Repository<Roles>


  ){}

 // TODO: buscamos el usuario por el email proporcionado en el auth <email>
 async findByEmailWithPassword(email: string) {
       
  return await this.userRepository.findOne({
      where: {email : email}, // tipico where de sql where email = email
      select: ['userId', 'name', 'email', 'password', 'roles'] //importante la password para verificar el jwt y el role para la authorizacion
  });

}
// TODO: metodo para buscar un usuario por el email
async findOneByEmail(email: string) {
  const userFound = await this.userRepository.findOneBy({ email });
  // console.log('usuario', userFound);
  return userFound;
}

 // TODO: metodo para crear un usuario
 async createUser( creteUserDto : CreateUserDto){

  //TODO> buscamos el rol por defecto en la base de datos ( ej: user )
  const defaultUser = await this.roleRepository.findOne({where: {name: 'user'}})

  // TODO> si no Existe o no se encuentra el rol
  if(!defaultUser){
      throw new Error('El rol por defecto no se encuentra en la base de datos')
  }


  //TODO> Crear un nuevo usuario y asignar el rol por defecto
  const newUser = this.userRepository.create({
      ...creteUserDto,
      roles:[defaultUser]

  });
  //TODO> salvamos el usaurio creado
  return this.userRepository.save(newUser);

}


// ************************************************

 //TODO: buscamos todos los usuarios
 findAll(){
  return this.userRepository.find();
}

}
