import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private selectedCurrency$ = new BehaviorSubject<string>("EUR")
  constructor() { }

  
  setCurrency (currency: string): void {
    this.selectedCurrency$.next(currency)
  }
  getCurrency (): Observable<string> {
    return this.selectedCurrency$.asObservable();
  }
  
}
