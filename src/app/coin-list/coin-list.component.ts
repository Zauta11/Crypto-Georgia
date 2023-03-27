import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'
import {  Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';
import { map, Observable, switchMap } from 'rxjs'
import { Detail } from '../Detail';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class CoinListComponent {

  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource!: MatTableDataSource<any>;
  isDisabled = false;

  currency$: Observable<string> = this.currencyService.getCurrency().pipe(
      switchMap((currency) => this.api.getDataCurrency(currency).pipe(
        map((res) => {
          this.dataSource= new MatTableDataSource(res)
            if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }) 
      ).pipe(map(() => currency))
      )
    )

    currencyFor$: Observable<any> = this.currencyService.getCurrency()
    .pipe(
      switchMap((currencys) => this.api.getDataCurrency(currencys).pipe(
          map((res) => res)).pipe(
            map(()=> currencys))
          )
    )
      
          
    bannerData$: Observable<any> = this.currency$.pipe(
      switchMap((currency) => this.api.getTrendingCurrency(currency))     
    )

  @ViewChild(MatPaginator) paginator!: MatPaginator;   
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private readonly api: ApiService, 
    private router: Router, 
    private currencyService: CurrencyService) {

      this.currencyFor$.subscribe((res) => {
        console.log("New Currency: ", res);
      });

    }

  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: Detail) {
    this.router.navigate(['coin-detail', row.id])
  }
}
  
