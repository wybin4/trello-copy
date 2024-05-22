import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto, LoginUserDto } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';
import { CatchError } from 'src/error.filter';
import { JWTAuthGuard } from '../guards/auth.guard';
import { AppConstants } from 'src/app.constants';
import { UserConstants } from '../constants/USER.constant';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    @ApiOperation({ summary: 'Регистрация' })
    @ApiResponse({ status: 201, description: 'Пользователь был зарегистрирован' })
    @ApiResponse({ status: 400, description: AppConstants.BAD_REQUEST_EXISTS('Пользователь') })
    async register(@Body() dto: CreateUserDto) {
        try {
            const user = await this.userService.create(dto);
            const token = await this.authService.login(user);
            return { token };
        } catch (e) {
            CatchError(e);
        }
    }

    @Post('login')
    @ApiOperation({ summary: 'Вход' })
    @ApiResponse({ status: 200, description: 'Пользователь вошел в систему' })
    @ApiResponse({ status: 400, description: AppConstants.BAD_REQUEST })
    async login(@Body() loginUserDto: LoginUserDto) {
        try {
            const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
            const token = await this.authService.login(user);
            return { token };
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получить пользователя по :id' })
    @ApiResponse({ status: 200, description: 'Пользователь получен' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 404, description: UserConstants.NOT_FOUND })
    async findOne(@Param('id') id: number) {
        try {
            return this.userService.findOne(id);
        } catch (e) {
            CatchError(e);
        }
    }

}
