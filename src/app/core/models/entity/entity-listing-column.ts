import { PipeTransform } from "@angular/core";
import { Observable } from "rxjs";


export interface IEntityListingColumn {
    model: string;
    title: string;
    
    isLink?: boolean;
    showEditLink? : boolean;
    viewLinkFunc?: any;
    editLinkFunc?: any;

    displayFunc?: any;
    displayFunc$?: any;
    
    pipe?: PipeTransform;
}