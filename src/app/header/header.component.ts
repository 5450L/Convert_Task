import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { currencyData, DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currencies?: currencyData[];
  currentDate = Date.now();
  subscription?: Subscription;

  constructor(private apiData: DataService) {}

  ngOnInit(): void {
    this.apiData.getCurrencyData().subscribe((data) => {
      this.currencies = data;
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
