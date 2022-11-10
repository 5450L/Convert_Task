import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { CurrencyData } from '../models/currencyData.model';
import { currencyData, DataService } from '../services/data.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  UAH = {
    ccy: 'UAH',
    base_ccy: 'UAH',
    buy: '1',
    sale: '1',
  };
  currencies: currencyData[] = [];

  currencyFrom: CurrencyData = new CurrencyData('', '', '', '');
  currencyTo: CurrencyData = new CurrencyData('', '', '', '');

  amountFrom: string = '';
  amountTo: string = '';

  constructor(private apiData: DataService) {}

  chooseCur(selector: HTMLSelectElement, name: string) {
    if (name === 'from') {
      
      this.currencyFrom =
        this.currencies?.find((cur) => {
          return cur.ccy === selector.value;
        }) ?? new CurrencyData('', '', '', '');
    } else

      this.currencyTo =
        this.currencies.find((cur) => {
          return cur.ccy === selector.value;
        }) ?? new CurrencyData('', '', '', '');

    this.convert(name);
  }

  convert(name: string) {

    if (name === 'from') {

      this.amountTo = (
        (+this.amountFrom * +this.currencyFrom.buy) /
        +this.currencyTo.sale
      ).toString();

      this.amountTo = (+this.amountTo).toFixed(2);
    } else {

      this.amountFrom = (
        (+this.amountTo * +this.currencyTo.buy) /
        +this.currencyFrom.sale
      ).toString();

      this.amountFrom = (+this.amountFrom).toFixed(2);
    }

    if (!this.amountFrom || !this.amountTo) {
      this.amountFrom = '';
      this.amountTo = '';
    }

  }

  ngOnInit(): void {
    this.subscription = this.apiData.getCurrencyData().subscribe((data) => {
     
      this.currencies.push(...data);
      this.currencies.push(this.UAH);

      this.currencyFrom =
        this.currencies.find((cur) => {
          return cur.ccy === 'USD';
        }) ?? new CurrencyData('', '', '', '');

      this.currencyTo =
        this.currencies.find((cur) => {
          return cur.ccy === 'UAH';
        }) ?? new CurrencyData('', '', '', '');

    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

