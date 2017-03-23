import {Injectable} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs/Rx";

@Injectable()

export class UrlService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
     }

  getParams(): Observable<Params> {
    return this.activatedRoute.queryParams;
  }

  setParams(page: number, size:number): Observable<boolean> {
    return Observable.fromPromise(this.router.navigate(['table'],{ queryParams: { page:page, size:size}}));

  }
}
