import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

// import { JwtService } from '../jwt/jwt.service';
import { catchError, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    // private jwtService: JwtService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, 
    { params })
      .pipe(catchError(this.formatErrors), share());
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors), share());
  }

  patch(path: string, body: Object = {}, resourceId: number): Observable<any> {
    return this.http.patch(
      `${environment.api_url}${path}${resourceId}`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(catchError(this.formatErrors), share());
  }

  post(path: string, body: Object = {}): Observable<any> {

    let req = this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(catchError(this.formatErrors), share());
    req.subscribe();
    return req;
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors), share());
  }
}
