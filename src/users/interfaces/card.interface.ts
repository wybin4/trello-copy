import { IComment } from "./comment.interface";

export interface ICard {
    id?: number;
    title: string;
    description?: string;
    comments: IComment[];
}