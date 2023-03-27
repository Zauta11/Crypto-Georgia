import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-georgia';
  selectedCurrency: string = "EUR"

    constructor(private currencyService: CurrencyService ) {}

  sendCurrency(e: any) {
    this.currencyService.setCurrency(e)
  }


}
