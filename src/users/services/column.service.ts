import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ColumnEntity } from "../entities/column.entity";
import { IColumn } from "../interfaces/column.interface";
import { UpdateColumnDto } from "../dtos/column.dto";

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnRepository: Repository<ColumnEntity>,
    ) { }

    async findAllByUserId(userId: number): Promise<ColumnEntity[]> {
        return this.columnRepository.find({
            where: { userId },
            relations: ['cards'],
        });
    }

    async create(title: string, userId: number): Promise<IColumn> {
        const existingColumn = await this.columnRepository.findOne({ where: { title, userId } });
        if (existingColumn) {
            throw new BadRequestException('Такая колонка уже существует');
        }
        return this.columnRepository.save({ title, userId });
    }

    async update(dto: UpdateColumnDto): Promise<IColumn> {
        const existingColumn = await this.columnRepository.findOne({ where: { id: dto.id } });
        if (!existingColumn) {
            throw new NotFoundException('Такая колонка не существует');
        }
        existingColumn.title = dto.title;
        return this.columnRepository.save(existingColumn);
    }

    async delete(id: number): Promise<void> {
        const existingColumn = await this.columnRepository.findOne({ where: { id } });
        if (!existingColumn) {
            throw new NotFoundException('Такая колонка не существует');
        }
        await this.columnRepository.remove(existingColumn);
    }
}