import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//TODO imports necesarios
import { Connection } from 'typeorm';
import { TypeOrmModule  } from '@nestjs/typeorm';
import { AuthenticationModule } from './authentication/authentication.module';
import { CatsModule } from './cats/cats.module';





@Module({
 
  imports: [
  
    // TODO: Configuracin de la base de datos para mysql
    TypeOrmModule.forRoot({
      type: 'mysql',
      host : 'localhost',
      port: 3306,
      username:'root',
      password: '',
      database: 'templateauth',
      // autoLoadEntities: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
      // entities: [Users, Roles],=====> fijate estan comentados
      synchronize: true,
    }),
  
    //TODO: Modulos necesario para authenticacion y permisos
    AuthenticationModule,
  
    //TODO: Modulos del proposito de la aplicacion
    CatsModule,
    
  
  
  ],
  providers: [
    
    AppService,
  
  ],
  controllers: [AppController],

 
})


export class AppModule {

  constructor( private connection : Connection ){
    this.checkDataBaseConnection();
  }

  //TODO: metodo para saber si la base de datos esta conectada
  async checkDataBaseConnection(){

    try {

      if(this.connection.isConnected) {
        console.log('********* Connected to MYSQL database **************')
      }else  {
        console.log('Failed to Connected to MYSQL database')
      }
    }catch(error){
      console.log(`Failed to Connect to Mysql dataBase ${error}`);
      
    }
  }
}

