import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { ColumnEntity } from "./column.entity";
import { CommentEntity } from "./comment.entity";
import { ICard } from "../interfaces/card.interface";

@Entity('cards')
export class CardEntity implements ICard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string; 

    @ManyToOne(() => ColumnEntity, column => column.cards)
    @JoinColumn({ name: 'columnId' })
    column: ColumnEntity;

    @Column()
    columnId: number;

    @OneToMany(() => CommentEntity, comment => comment.card)
    comments: CommentEntity[];
}