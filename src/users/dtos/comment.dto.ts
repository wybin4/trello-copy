import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { CardConstants } from '../constants/card.constant';
import { CommentConstants } from '../constants/comment.constant';

export class CreateCommentDto {
    @ApiProperty({ description: CardConstants.ID, example: 1 })
    @IsNumber({}, { message: CardConstants.ID_VALID })
    cardId: number;

    @ApiProperty({ description: CommentConstants.TEXT, minLength: CommentConstants.STRING_MIN_LEN, example: 'Сбор требований' })
    @IsString({ message: CommentConstants.TEXT_VALID })
    @MinLength(CommentConstants.STRING_MIN_LEN, { message: CommentConstants.TEXT_MIN_LEN_VALID })
    text: string;
}

export class UpdateCommentDto {
    @ApiProperty({ description: CommentConstants.ID, example: 1 })
    @IsNumber({}, { message: CommentConstants.ID_VALID })
    id: number;

    @ApiProperty({ description: CommentConstants.TEXT, minLength: CommentConstants.STRING_MIN_LEN, example: 'Сбор требований' })
    @IsString({ message: CommentConstants.TEXT_VALID })
    @MinLength(CommentConstants.STRING_MIN_LEN, { message: CommentConstants.TEXT_MIN_LEN_VALID })
    text: string;
}