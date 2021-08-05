import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AppConfig } from 'src/app/init/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private readonly CONFIG_URL = 'assets/config/configuration.json';
  private configuration$: Observable<AppConfig>;

  constructor(private http: HttpClient) { }

  public loadConfiguration(): Observable<AppConfig> {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<AppConfig>(this.CONFIG_URL).pipe(
        shareReplay(1)
      );
    }
    return this.configuration$;
  }
}
