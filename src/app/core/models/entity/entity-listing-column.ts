import { PipeTransform } from "@angular/core";

export interface IEntityListingColumn {
    model: string;
    title?: string;

    isLink?: boolean;
    showEditLink?: boolean;
    viewLinkFunc?: any;
    editLinkFunc?: any;

    displayFunc?: any;
    displayFunc$?: any;

    isHtml?: boolean;

    pipe?: PipeTransform;
}