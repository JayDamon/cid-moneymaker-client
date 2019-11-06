import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

// import { JwtService } from '../jwt/jwt.service';
import { catchError } from 'rxjs/operators';

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

  // get(path: string): Observable<any> {
  //   return this.http.get(`${environment.api_url}${path}`)
  //   .pipe(catchError(this.formatErrors));
  // }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, 
    { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    
    console.log(JSON.stringify(body));
    console.log(path);
    console.log(environment.api_url);

    // TODO: this post is not making it to the server.
    let req = this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(catchError(this.formatErrors));
    req.subscribe();
    return req;
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
