import { Observable } from "rxjs";


export interface IEntitySubGridColumn {
    model: string;
    title: string;

    isLink?: boolean;
    viewLinkFunc?: any;
    editLinkFunc?: any;

    displayFunc?: any;
    displayFunc$?: any;

    formatter?: 'd';
}