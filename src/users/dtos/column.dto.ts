import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { ColumnConstants } from '../constants/column.constant';

export class CreateColumnDto {
    @ApiProperty({ description: ColumnConstants.TITLE, example: 'План' })
    @IsString({ message: ColumnConstants.TITLE_VALID })
    @MinLength(ColumnConstants.STRING_MIN_LEN, { message: ColumnConstants.TITLE_MIN_LEN_VALID })
    title: string;
}

export class UpdateColumnDto {
    @ApiProperty({ description: ColumnConstants.ID, example: 5 })
    @IsNumber({}, { message: ColumnConstants.ID_VALID })
    id: number;

    @ApiProperty({ description: ColumnConstants.TITLE, example: 'План-капкан' })
    @IsString({ message: ColumnConstants.TITLE_VALID })
    @MinLength(ColumnConstants.STRING_MIN_LEN, { message: ColumnConstants.TITLE_MIN_LEN_VALID })
    title: string;
}