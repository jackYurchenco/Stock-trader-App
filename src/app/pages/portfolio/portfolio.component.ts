import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator} from "@angular/material";
import {PortfolioService} from "../../services/portfolio.service";
import {from, Subscription} from "rxjs";
import {findIndex} from "rxjs/internal/operators";
import {IStock} from "../../services/stock.service";
import {BalanceService} from "../../services/balance.service";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass']
})
export class PortfolioComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'quantity', 'quantity_sell', 'price', 'sell'];
  pageSizeOptions = [5, 10, 25, 100];
  portfolio: any;
  subscriptions = new Subscription;
  balance: number;
  constructor(private portfolioService : PortfolioService,
              private balanceService   : BalanceService) {
    this.portfolio = new MatTableDataSource([]);
  }

  ngOnInit() {
    /*get portfolio from global variable*/
    this.subscriptions.add(this.portfolioService.portfolio.subscribe(data => {
      this.portfolio.data = data;
      this.portfolio.paginator = this.paginator;
    }));
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }
  sell(element){
    if(element.quantety_sell){
      from(this.portfolio.data)
        .pipe(findIndex((val: IStock) => val.id === element.id))
        .subscribe(index => {
          /*subtract quantety*/
          let result = this.portfolio.data[index].subtractQuantety(element.quantety_sell);

          if(result){
            /*make balance*/
            this.balanceService.currentBalance.subscribe(balance => this.balance = balance).unsubscribe();
            this.balance += element.quantety_sell * Number(this.portfolio.data[index].price);
            this.balanceService.changeBalance(this.balance);
          }
          /*remove quantety from list if == 0 and update portfolio in global variable*/
          if(!this.portfolio.data[index].quantety)
            this.portfolio.data.splice(index, 1);
          this.portfolioService.changePortfolio(this.portfolio.data);
        })
        .unsubscribe();
    }
  }
}
