import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ColumnConstants } from '../constants/column.constant';
import { CardConstants } from '../constants/card.constant';

export class CreateCardDto {
    @ApiProperty({ description: ColumnConstants.ID, example: 5 })
    @IsNumber({}, { message: ColumnConstants.ID_VALID })
    columnId: number;

    @ApiProperty({ description: CardConstants.TITLE, minLength: CardConstants.STRING_MIN_LEN, example: 'Сбор требований' })
    @IsString({ message: CardConstants.TITLE_VALID })
    @MinLength(CardConstants.STRING_MIN_LEN, { message: CardConstants.TITLE_MIN_LEN_VALID })
    title: string;

    @ApiPropertyOptional({ description: CardConstants.DESCRIPTION, minLength: CardConstants.STRING_MIN_LEN, example: 'Прочтение требований в таблице и pdf-документе' })
    @IsString({ message: CardConstants.DESCRIPTION_VALID })
    @MinLength(CardConstants.STRING_MIN_LEN, { message: CardConstants.DESCRIPTION_MIN_LEN_VALID })
    @IsOptional()
    description?: string;
}

export class UpdateCardDto {
    @ApiProperty({ description: CardConstants.ID, example: 1 })
    @IsNumber({}, { message: CardConstants.ID_VALID })
    id: number;

    @ApiPropertyOptional({ description: CardConstants.TITLE, minLength: CardConstants.STRING_MIN_LEN, example: 'Сбор требований' })
    @IsString({ message: CardConstants.TITLE_VALID })
    @MinLength(CardConstants.STRING_MIN_LEN, { message: CardConstants.TITLE_MIN_LEN_VALID })
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ description: CardConstants.DESCRIPTION, minLength: CardConstants.STRING_MIN_LEN, example: 'Прочтение требований в таблице и pdf-документе' })
    @IsString({ message: CardConstants.DESCRIPTION_VALID })
    @MinLength(CardConstants.STRING_MIN_LEN, { message: CardConstants.DESCRIPTION_MIN_LEN_VALID })
    @IsOptional()
    description?: string;
}