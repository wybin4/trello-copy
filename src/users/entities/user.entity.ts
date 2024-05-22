import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { ColumnEntity } from './column.entity';

@Entity('users')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => ColumnEntity, column => column.user)
    columns: ColumnEntity[];
}