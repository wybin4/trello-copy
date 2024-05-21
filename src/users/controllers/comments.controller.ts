import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { JWTAuthGuard } from '../guards/auth.guard';
import { OwnershipGuard } from '../guards/ownership.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatchError } from 'src/error.filter';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comment.dto';
import { CommentConstants } from '../constants/comment.constant';
import { AppConstants } from 'src/app.constants';

@ApiTags('comments')
@Controller('users/:userId/columns/cards/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Создать комментарий' })
    @ApiResponse({ status: 201, description: 'Комментарий успешно создан' })
    @ApiResponse({ status: 400, description: "Неверные данные" })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    async create(@Body() dto: CreateCommentDto) {
        try {
            return this.commentService.create(dto);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Patch()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Изменить комментарий' })
    @ApiResponse({ status: 200, description: 'Комментарий успешно изменен' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiResponse({ status: 404, description: CommentConstants.NOT_FOUND })
    async update(@Body() dto: UpdateCommentDto) {
        try {
            return this.commentService.update(dto);
        } catch (e) {
            CatchError(e);
        }
    }

    @UseGuards(JWTAuthGuard, OwnershipGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Удалить комментарий' })
    @ApiResponse({ status: 204, description: 'Комментарий успешно удален' })
    @ApiResponse({ status: 401, description: AppConstants.UNAUTHORIZED })
    @ApiResponse({ status: 403, description: AppConstants.FORBIDDEN })
    @ApiResponse({ status: 404, description: CommentConstants.NOT_FOUND })
    @ApiParam({ name: 'id', type: Number, description: 'Id комментария' })
    async delete(@Param('id') id: number) {
        try {
            return this.commentService.delete(id);
        } catch (e) {
            CatchError(e);
        }
    }

}