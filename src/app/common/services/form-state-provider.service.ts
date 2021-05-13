import { Observable } from "rxjs";
import { IFormState } from "../models/form-state";

// injection token
export const FORM_STATE_PROVIDER = "IFormStateProvider";

export interface IFormStateProvider {

    // get column
    getState() : Observable<IFormState>;
}