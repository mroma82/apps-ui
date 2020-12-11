import { Observable } from 'rxjs';

export class IMenuItem {
    title : string;
    url : string;
    icon: string;
    description: string;
    hasAccess$: Observable<boolean>
}