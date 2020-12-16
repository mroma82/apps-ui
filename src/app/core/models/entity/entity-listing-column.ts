import { Observable } from "rxjs";


export interface IEntityListingColumn {
    model: string;
    title: string;
    isLink?: boolean;
    displayFunc?: any;
    displayFunc$?: any;
}