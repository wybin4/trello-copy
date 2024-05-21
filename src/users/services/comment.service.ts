import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IComment } from "../interfaces/comment.interface";
import { CommentEntity } from "../entities/comment.entity";
import { CreateCommentDto, UpdateCommentDto } from "../dtos/comment.dto";
import { CommentConstants } from "../constants/comment.constant";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
    ) { }

    async create(dto: CreateCommentDto): Promise<IComment> {
        return this.commentRepository.save(dto);
    }

    async update(dto: UpdateCommentDto): Promise<IComment> {
        const existingComment = await this.commentRepository.findOne({ where: { id: dto.id } });
        if (!existingComment) {
            throw new NotFoundException(CommentConstants.NOT_FOUND);
        }
        existingComment.text = dto.text;
        return this.commentRepository.save(existingComment);
    }

    async delete(id: number): Promise<void> {
        const existingComment = await this.commentRepository.findOne({ where: { id } });
        if (!existingComment) {
            throw new NotFoundException(CommentConstants.NOT_FOUND);
        }
        await this.commentRepository.remove(existingComment);
    }
}