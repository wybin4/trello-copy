import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ColumnService } from '../services/column.service';
import { JWTAuthGuard } from '../guards/auth.guard';
import { OwnershipGuard } from '../guards/ownership.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatchError } from 'src/error.filter';
import { CreateColumnDto, UpdateColumnDto } from '../dtos/column.dto';
import { ColumnConstants } from '../constants/column.constant';
import { AppConstants } from 'src/app.constants';

@ApiTags('columns')
@Controller('users/:userId/columns')
export class ColumnController {
    constructor(private readonly columnService: ColumnService) { }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получить колонки пользователя с карточками по :userId' })
    @ApiResponse({ status: 200, description: 'Колонки с карточками получены' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiParam({ name: 'userId', type: Number, description: 'Id пользователя' })
    async findAllByUserId(@Param('userId') userId: number) {
        try {
            return this.columnService.findAllByUserId(userId);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Создать колонку' })
    @ApiResponse({ status: 201, description: 'Колонка успешно создана' })
    @ApiResponse({ status: 400, description: AppConstants.BAD_REQUEST_EXISTS('Колонка') })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiParam({ name: 'userId', type: Number, description: 'Id пользователя' })
    async create(@Param('userId') userId: number, @Body() dto: CreateColumnDto) {
        try {
            return this.columnService.create(dto.title, userId);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Patch()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Изменить колонку' })
    @ApiResponse({ status: 200, description: 'Колонка успешно изменена' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiResponse({ status: 404, description: ColumnConstants.NOT_FOUND })
    async update(@Body() dto: UpdateColumnDto) {
        try {
            return this.columnService.update(dto);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Удалить колонку' })
    @ApiResponse({ status: 204, description: 'Колонка успешно удалена' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiResponse({ status: 404, description: ColumnConstants.NOT_FOUND })
    @ApiParam({ name: 'id', type: Number, description: ColumnConstants.ID })
    async delete(@Param('id') id: number) {
        try {
            return this.columnService.delete(id);
        } catch (e) {
            CatchError(e);
        }
    }

}