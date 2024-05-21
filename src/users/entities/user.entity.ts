import { IsEmail, IsString, MinLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { ColumnEntity } from './column.entity';

@Entity('users')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(4)
    name: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @MinLength(8)
    password: string;

    @OneToMany(() => ColumnEntity, column => column.user)
    columns: ColumnEntity[];
}