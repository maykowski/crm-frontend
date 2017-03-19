import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
// import "rxjs/add/operator/toPromise";
import {Training} from "./training";
import {Observable} from "rxjs/Rx";

@Injectable()
export class TrainingService {


  private trainingUrl = 'http://localhost:8080/trainings';  // URL to web api

  constructor(private http: Http) {
  }

  getTrainings(): Observable<Training[]> {
    return this.http.get(this.trainingUrl)
      .map((response:Response) => response.json())
      .catch(TrainingService.handleError);
  }

  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
