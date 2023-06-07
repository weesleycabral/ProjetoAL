import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestControllerService extends BaseService {
  public apiKey = 'RVZG0GHEV2KORLNA';

  constructor(private http: HttpClient) {
    super();
  }

  public getCurrentExchangeRate(from_symbol: string, to_symbol: string): Observable<any> {
    const params = {
      apiKey: this.apiKey,
      from_symbol,
      to_symbol,
    };

    return this.http.get(`${this.Basepath()}currentExchangeRate`, {
      headers: this.Headers(),
      params,
    });
  }

  public getDailyExchangeRate(from_symbol: string, to_symbol: string): Observable<any> {
    const params = {
      apiKey: this.apiKey,
      from_symbol,
      to_symbol,
    };

    return this.http.get(`${this.Basepath()}dailyExchangeRate`, {
      headers: this.Headers(),
      params,
    });
  }
}
