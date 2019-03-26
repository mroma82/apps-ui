import { Injectable } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { Observable, of } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  // new
  constructor(
    private apiClient : AppHttpClientService,
    private http: HttpClient
  ) { }

  // get all by context
  getAllByContext(contextType: number, contextId: string) : Observable<any> {
    return this.apiClient.get(`/foundation/attachment/getByContext/${contextType}/${contextId}`);
    /*return of([
      { id: "123", description: "Attachment 1" },
      { id: "234", description: "Attachment 2" },
    ]);*/
  }

  // add
  add(model: any) {
    return this.apiClient.post("/foundation/attachment/add", model);
  }

  // upload temp file
  uploadTempFile(file: any) : Observable<any> {
    
    // build body
    const formData = new FormData();
    formData.append(file.name, file);

    // post
    return this.apiClient.post('/foundation/tempFile/upload', formData);
  }
}
