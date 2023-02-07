import { PipeTransform } from "@angular/core";

export interface IEntityListingColumn {
    model: string;
    title?: string;

    isLink?: boolean;
    showEditLink?: boolean;
    viewLinkFunc?: any;
    editLinkFunc?: any;
    showOnMobile?: boolean;

    displayFunc?: any;

    isHtml?: boolean;

    pipe?: PipeTransform;
}