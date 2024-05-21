import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { CardEntity } from "./card.entity";
import { IColumn } from "../interfaces/column.interface";

@Entity('columns')
export class ColumnEntity implements IColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => UserEntity, user => user.columns)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    userId: number;

    @OneToMany(() => CardEntity, card => card.column)
    cards: CardEntity[];
}
