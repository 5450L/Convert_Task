import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface currencyData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCurrencyData() {
    return this.http.get<currencyData[]>(
      'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
    );
  }
}
