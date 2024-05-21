import { ICard } from "./card.interface";

export interface IColumn {
    id?: number;
    title: string;
    cards: ICard[];
}