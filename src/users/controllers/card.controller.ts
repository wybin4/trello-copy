import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CardService } from '../services/card.service';
import { JWTAuthGuard } from '../guards/auth.guard';
import { OwnershipGuard } from '../guards/ownership.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatchError } from 'src/error.filter';
import { CreateCardDto, UpdateCardDto } from '../dtos/card.dto';
import { CardConstants } from '../constants/card.constant';
import { AppConstants } from 'src/app.constants';

@ApiTags('cards')
@Controller('users/:userId/columns/cards')
export class CardController {
    constructor(private readonly cardService: CardService) { }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Создать карточку' })
    @ApiResponse({ status: 201, description: 'Карточка успешно создана' })
    @ApiResponse({ status: 400, description: 'Неверные данные/Карточка уже существует' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    async create(@Body() dto: CreateCardDto) {
        try {
            return this.cardService.create(dto);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Patch()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Изменить карточку' })
    @ApiResponse({ status: 200, description: 'Карточка успешно изменена' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiResponse({ status: 404, description: CardConstants.NOT_FOUND })
    async update(@Body() dto: UpdateCardDto) {
        try {
            return this.cardService.update(dto);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Удалить карточку' })
    @ApiResponse({ status: 204, description: 'Карточка успешно удалена' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiResponse({ status: 404, description: CardConstants.NOT_FOUND })
    @ApiParam({ name: 'id', type: Number, description: 'Id карточки' })
    async delete(@Param('id') id: number) {
        try {
            return this.cardService.delete(id);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Получить карточку по :id с комментариями' })
    @ApiResponse({ status: 200, description: 'Карточка с комментариями получена' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 404, description: 'Карточка не найдена' })
    async findOne(@Param('id') id: number) {
        try {
            return this.cardService.findOne(id);
        } catch (e) {
            CatchError(e);
        }
    }
}