import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

interface Configuration {
  resourceServer: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly CONFIG_URL = 'assets/config/configuration.json';
  private configuration$: Observable<Configuration>;

  constructor(private http: HttpClient) { }

  public loadConfiguration(): Observable<Configuration> {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<Configuration>(this.CONFIG_URL).pipe(
        shareReplay(1)
      );
    }
    return this.configuration$;
  }
}
