import {Injectable} from '@angular/core';
import {Http, Headers, Response, URLSearchParams, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Rx";
import {Contact} from "./contact";
import {ActivatedRoute} from "@angular/router";

@Injectable()
export class TableService{


  private tableDetUrl = 'http://localhost:8080/contacts';  // URL to web api

  constructor(private http: Http, private route: ActivatedRoute) { }


  getTableDetail(id: number): Promise<any> {
    const url = `${this.tableDetUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  getTableDetail2(id: number): Observable<Contact> {
    const url = `${this.tableDetUrl}/${id}`;
    return this.http.get(url).map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getTable(page:number, size:number){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', String(page-1));
    params.set('size', String(size));

    let requestOptions = new RequestOptions();
    requestOptions.search = params;
    return this.http.get(this.tableDetUrl,requestOptions)
      // .toPromise()
      .map(response => response.json())
      .catch(this.handleError);
  }





  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise(resolve => {
  //     // Simulate server latency with 2 second delay
  //     setTimeout(() => resolve(this.getHeroes()), 2000);
  //   });
  // }

  private headers = new Headers({'Content-Type': 'application/json'});

  update(row: any): Promise<any> {
    const url = `${this.tableDetUrl}/${row.id}`;
    return this.http
      .put(url, JSON.stringify(row), {headers: this.headers})
      .toPromise()
      .then(() => row)
      .catch(this.handleError);
  }

  create(name: string): Promise<any> {
    return this.http
      .post(this.tableDetUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tableDetUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }



}
