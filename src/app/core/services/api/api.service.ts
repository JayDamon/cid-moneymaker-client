import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/init/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private configUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigurationService
  ) {
    this.config.loadConfiguration().subscribe((c: any) => {
      this.configUrl = c.resourceServer;
    })
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.configUrl}${path}`,
    { params })
      .pipe(catchError(this.formatErrors), share());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.configUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors), share());
  }

  patch(path: string, body: Object = {}, resourceId: number): Observable<any> {
    return this.http.patch(
      `${this.configUrl}${path}${resourceId}`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(catchError(this.formatErrors), share());
  }

  post(path: string, body: Object = {}): Observable<any> {

    let req = this.http.post(
      `${this.configUrl}${path}`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(catchError(this.formatErrors), share());
    req.subscribe();
    return req;
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.configUrl}${path}`
    ).pipe(catchError(this.formatErrors), share());
  }
}
