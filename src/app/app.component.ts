import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription, from} from "rxjs";
import {PortfolioService} from "./services/portfolio.service";
import {map} from "rxjs/internal/operators";
import {BalanceService} from "./services/balance.service";
import {Stock, IStock} from "./services/stock.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'stock-trader';
  subscriptions = new Subscription;
  constructor(private portfolioService  : PortfolioService,
              private balanceService    : BalanceService){}

  ngOnInit() {
    /* get balance */
    this.subscriptions.add(this.balanceService.getBalance()
      .pipe(map(data => data.json()))
      .subscribe(response =>{
        this.balanceService.changeBalance(response.total);
      }));

    /*get portfolio*/
    this.subscriptions.add(this.portfolioService.getPortfolio()
      .pipe(map(data => data.json()))
      .subscribe(response =>{
        let portfolio = [];
        from(response.list)
          .pipe(
            map((val : IStock)=> new Stock(val))
          )
          .subscribe(val => {
            portfolio.push(val)
          })
          .unsubscribe();

        this.portfolioService.changePortfolio(portfolio);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
