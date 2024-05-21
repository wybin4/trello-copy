import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<IUser> {
        const user = await this.usersService.validateUser(email, password);
        if (!user) {
            throw new NotFoundException('Такой пользователь не существует');
        }
        return user;
    }

    async login(user: IUser) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
