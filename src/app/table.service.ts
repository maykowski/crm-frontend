import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TableService{


  private tableDetUrl = 'http://localhost:8080/contacts';  // URL to web api

  constructor(private http: Http) { }


  getTableDetail(id: number): Promise<any> {
    const url = `${this.tableDetUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  getTable(): Promise<any[]> {
    return this.http.get(this.tableDetUrl)
      .toPromise()
      .then(response => response.json())
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
