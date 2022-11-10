import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { currencyData, DataService } from '../data.service';

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
  currencies?: currencyData[] = [];

  currency1?: currencyData = this.currencies?.find((cur) => {
    return cur.ccy === 'USD';
  });
  currency2?: currencyData = this.currencies?.find((cur) => {
    return cur.ccy === 'UAH';
  });

  amount1!: string | number;
  amount2!: string | number;

  constructor(private apiData: DataService) {}

  chooseCur(selector: HTMLSelectElement, name: string) {
    if (name === 'from') {
      this.currency1 = this.currencies?.find((cur) => {
        return cur.ccy === selector.value;
      });
    } else
      this.currency2 = this.currencies?.find((cur) => {
        return cur.ccy === selector.value;
      });
  }

  convert(name: string) {
    if (name === 'from') {
      this.amount2 =
        (+this.amount1 * +this.currency1!.buy) / +this.currency2!.sale;
      this.amount2 = this.amount2.toFixed(2);
    } else {
      this.amount1 =
        (+this.amount2 * +this.currency2!.buy) / +this.currency1!.sale;
      this.amount1 = this.amount1.toFixed(2);
    }
  }

  ngOnInit(): void {
    this.subscription = this.apiData.getCurrencyData().subscribe((data) => {
      console.log(data);
      this.currencies?.push(...data);
      this.currencies?.push(this.UAH);

      this.currency1 = this.currencies?.find((cur) => {
        return cur.ccy === 'USD';
      });
      this.currency2 = this.currencies?.find((cur) => {
        return cur.ccy === 'UAH';
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
