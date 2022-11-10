import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CurrencyData } from '../models/currencyData.model';

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
    return this.http
      .get<CurrencyData[]>(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11'
      )
      .pipe(
        map((data) => {
          let usd: CurrencyData;
          let currencyForChange: CurrencyData;
          let changingCurrencyIndex: number = 0;

          currencyForChange =
            data.find((currency, index) => {
              changingCurrencyIndex = index;
              return currency.base_ccy === 'USD';
            }) ?? new CurrencyData('', '', '', '');

          usd =
            data.find((currency) => {
              return (currency.ccy = 'USD');
            }) ?? new CurrencyData('', '', '', '');

          currencyForChange.base_ccy = 'UAH';
          currencyForChange.buy = (
            +usd.sale * +currencyForChange.buy
          ).toString();
          currencyForChange.sale = (
            +usd.buy * +currencyForChange.sale
          ).toString();

          data[changingCurrencyIndex] = currencyForChange;
          return data;
        })
      );
  }
}
