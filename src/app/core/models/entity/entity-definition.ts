import { IEntityColumnDefinition } from "./entity-column-definition";


export interface IEntityDefinition {
    entityTypeId: string;
    name: string;
    pluralName: string;
    icon: string;
    description: string;
    rootUrl: string;
    hasAuditTrail: boolean;
    columns: IEntityColumnDefinition[];
}