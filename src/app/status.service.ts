import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";

@Injectable()
export class StatusService {


  private statusUrl = 'http://localhost:8080/statuses';  // URL to web api

  constructor(private http: Http) {
  }

  getStatuses(): Promise<any[]> {
    return this.http.get(this.statusUrl)
      .toPromise()
      .then(response => response.json())
      .catch(StatusService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
