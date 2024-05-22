import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ICard } from "../interfaces/card.interface";
import { CardEntity } from "../entities/card.entity";
import { CreateCardDto, UpdateCardDto } from "../dtos/card.dto";
import { CardConstants } from "../constants/card.constant";

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly cardRepository: Repository<CardEntity>,
    ) { }

    async create(dto: CreateCardDto): Promise<ICard> {
        const existingCard = await this.cardRepository.findOne({
            where: { columnId: dto.columnId, title: dto.title }
        });
        if (existingCard) {
            throw new BadRequestException(CardConstants.ALREADY_EXISTS);
        }
        return this.cardRepository.save(dto);
    }

    async update(dto: UpdateCardDto): Promise<ICard> {
        const existingCard = await this.cardRepository.findOne({ where: { id: dto.id } });
        if (!existingCard) {
            throw new NotFoundException(CardConstants.NOT_FOUND);
        }
        if (!dto.title && !dto.description) {
            throw new BadRequestException('Нужно хотя бы одно поле');
        }
        if (dto.title) {
            existingCard.title = dto.title;
        }
        if (dto.description) {
            existingCard.description = dto.description;
        }
        return this.cardRepository.save(existingCard);
    }

    async delete(id: number): Promise<void> {
        const existingCard = await this.cardRepository.findOne({ where: { id } });
        if (!existingCard) {
            throw new NotFoundException(CardConstants.NOT_FOUND);
        }
        await this.cardRepository.remove(existingCard);
    }

    async findOne(id: number): Promise<CardEntity> {
        const card = await this.cardRepository.findOne({
            where: { id },
            relations: ['comments'],
        });
        if (!card) {
            throw new NotFoundException(CardConstants.NOT_FOUND);
        }
        return card;
    }
}