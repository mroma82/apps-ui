import { Observable } from "rxjs";
import { IFormColumnDefinition } from "../models/form-column-definition";

// injection token
export const FORM_COLUMN_PROVIDER = "IFormColumnProvider";

export interface IFormColumnProvider {

    // get column
    getColumn(name: string) : Observable<IFormColumnDefinition>;
}