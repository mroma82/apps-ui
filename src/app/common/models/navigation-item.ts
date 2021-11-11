import { Observable } from 'rxjs';

export interface INavigationItem {
    url: string;
    title: string;
    hasAccess$?: Observable<boolean>;
    activePathIsExact?: boolean;
    disableActivePath?: boolean;
}