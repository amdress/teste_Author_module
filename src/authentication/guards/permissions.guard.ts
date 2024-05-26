import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';



//TODO:  este guard debe confirma el rol del usuario y los permisos para poder avanzar hacia el recuerso
@Injectable()
export class PermissionGuard implements CanActivate {


  constructor(
    private reflector: Reflector,
    // private usersService: UsersService,
    // private readonly permissionsService : PermissionsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
     //******************************** USUARIO ******************************************** *
     
    // quien es el usuario que intenta entrar? 

    const request = context.switchToHttp().getRequest();//TODO: tomamos todo el usuario del contexto 
    const user = request.user;
      
    // console.log('usuario que intentga entrar es: '+ JSON.stringify(user))


     //******************************** ROLE QUE PIDE PARA ENTRAR  ******************************************** *
    //TODO: tomamos los roles que se envian por parametros(setmetadata) roles permitidos en la ruta
    const rolesContext = this.reflector.get<string[]>('roles', context.getHandler()) 
    // console.log("Roles que se piden para pasar: "+rolesContext)


    //******************************** VALIDAMOS QUE TENGA EL ROL QUE PIDE  *********************************** *
    
    //TODO: verificamos que este usuario tenga el rol necesario para proseguir
    if(!user || !user.roles.some(role => rolesContext.includes(role.name)) ) {
      throw new UnauthorizedException("Usuario no tiene el rol permitido")
    }else{
      // console.log("el usuario tiene el rol que se pide") 
    }
 

    //******************************** PERMISOS ******************************************** */
    
    // TODO:  Accede al nombre del controlador y metodo desde el objeto req que se asigno en el middleware
    const controllerName = request.controller; // a cual modulo viene ? 
    const methodName = request.methodName;  // a cual metodo viene ? 
    
    console.log("controlador: "+ controllerName, "metodos: "+ methodName)
    
    // existe el modulo al que quiere entrar?
    // const moduleExists = await this.permissionsService.findModuleByName(controllerName);

    // if(!moduleExists) {
    //   console.log("el modulo no existe en el base de datos")
    // }else {
    //   console.log("el modulo  existe en el base de datos")
    // }
        
    // que permisos tiene el usuario sobre la ruta, puede o no?

    // 1) confirmar que exista ese modulo registrado en la tabla
    // 2) registrarlo si no existe
    // 3) 

    // TODO : Verificar si los permisos ya estan registrados para este usuario y modulo

   // ahora debe crear un middleware que verifique el permiso 

    


    return true;
  }
}


