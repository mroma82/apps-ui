import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppHttpClientService } from '../../../common/services/app-http-client.service';
import { ITaskItem } from '../../models/task/task-item';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private apiClient: AppHttpClientService
  ) { }

  // get for user
  getForCurrentUser(): Observable<ITaskItem[]> {
    return this.apiClient.get("/foundation/task/getForCurrentUser");
  }
}
