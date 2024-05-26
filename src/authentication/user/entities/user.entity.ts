import { Roles } from '../../roles/entities/role.entity';
import {Column, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column({ unique: true , nullable: false })
    email: string;
    
    @Column({ nullable: false , select: false})
    password: string;

    //TODO: tabla intermedia de relacion
   @ManyToMany(() => Roles, { eager: true })
   @JoinTable({
        name: "users_roles", //TODO: nombre de la tabla
        //TODO: campos de la tabla
        joinColumn : {
            name: 'userId', //nombre de la columna que contiene la llave primaria
            referencedColumnName: 'userId',// nmbre de la coluna referencia tabla user
        },
        inverseJoinColumn : {
            name: 'roleId', 
            referencedColumnName: 'roleId'
        }, 
   })
   roles: Roles[];
   
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}


