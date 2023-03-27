import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../service/api.service';
import { CurrencyService } from '../service/currency.service';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { Coin } from '../coin';
@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinDetailComponent{
  
  currency?: string ="EUR";
  
  coinData$?: Observable<Coin> = combineLatest([
    this.activatedRoute.params,
    this.currencyService.getCurrency().pipe(
      tap((val) => {
        this.currency = val
      })
    )
  ]).pipe(
  switchMap(([params, currency]: [Params, string]) => this.api.getCurrencyById(params["id"]))
  )


  coinNew$?: Observable<Coin> = this.activatedRoute.params.pipe(
    switchMap((param : Params) => this.api.getCurrencyById(param['id']))
  )
 

  constructor( private api: ApiService, 
    private activatedRoute: ActivatedRoute, 
    private currencyService: CurrencyService
    ) {

      this.coinNew$?.subscribe(res => 
        console.log("CoinData: ", res)
        )
      
    }
  


}
