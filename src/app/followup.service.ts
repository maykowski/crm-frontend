import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FollowupService{


  private followupUrl = 'http://localhost:8080/';  // URL to web api

  constructor(private http: Http) { }

 getFollowups(contactId:number): Promise<any[]> {
    return this.http.get(this.followupUrl+contactId+"/followups")
      .toPromise()
      .then(response => response.json())
      .catch(FollowupService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  // update(row: any, contactId:number): Promise<any> {
  //   const url = `${this.followupUrl}/${row.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(row), {headers: this.headers})
  //     .toPromise()
  //     .then(() => row)
  //     .catch(this.handleError);
  // }

  create(followup: any, contactId:number): Promise<any> {
    let url = this.followupUrl + contactId + "/followups";
    return this.http.post(url, JSON.stringify(followup), {headers: this.headers})
      .toPromise()
      .catch(FollowupService.handleError);
  }

  // delete(id: number): Promise<void> {
  //   const url = `${this.followupUrl}/${id}`;
  //   return this.http.delete(url, {headers: this.headers})
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }



}
