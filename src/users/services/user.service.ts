import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findAll(): Promise<IUser[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<Omit<IUser, 'password'>> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Такой пользователь не существует');
        }
        const { password, ...result } = user;
        return result;
    }

    async findByEmail(email: string): Promise<IUser> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(user: IUser): Promise<IUser> {
        const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
        if (existingUser) {
            throw new BadRequestException('Такой пользователь уже существует');
        }
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}