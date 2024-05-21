import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CardEntity } from "./card.entity";
import { IComment } from "../interfaces/comment.interface";

@Entity('comments')
export class CommentEntity implements IComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => CardEntity, card => card.comments)
    @JoinColumn({ name: 'cardId' })
    card: CardEntity;

    @Column()
    cardId: number;
}