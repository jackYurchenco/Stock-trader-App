import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {StockService, IStock, Stock} from "../../services/stock.service";
import {map, distinct, count, findIndex} from "rxjs/internal/operators";
import {Subscription, from} from "rxjs";
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {PortfolioService} from "../../services/portfolio.service";
import {BalanceService} from "../../services/balance.service";


@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.sass']
})
export class MarketsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'quantity', 'price', 'buy'];
  pageSizeOptions = [5, 10, 25, 100];
  stock: any;
  subscriptions = new Subscription;
  categories = [];
  portfolio : Stock[];
  quantety: any;
  balance: number;
  constructor(private stockService      : StockService,
              private portfolioService  : PortfolioService,
              private balanceService    : BalanceService) {
    this.stock = new MatTableDataSource([]);
    this.portfolioService.portfolio.subscribe(portfolio => {
      this.portfolio = portfolio;
    });
  }

  ngOnInit() {
    /*get stock*/
    this.subscriptions.add(this.stockService.getMarkets()
      .pipe(map(data => data.json()))
      .subscribe(response =>{
        this.stock.data = response;
        this.stock.paginator = this.paginator;
        /*get categories*/
        this.getCategories(this.stock.data)
      }));
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  getCategories(data){
    from(data)
      .pipe(distinct((item: IStock) => item.category))
      .subscribe((item: IStock) => {
        this.categories.push(item.category);
      })
      .unsubscribe();
  }

  changeCategoy(category){
    this.stock.filter = category;
  }

  buy(element: IStock){
    if(element.quantety){
      /*make balance*/
      this.balanceService.currentBalance.subscribe(balance => this.balance = balance).unsubscribe();
      this.balance -= element.quantety * Number(element.price);
      if(this.balance >= 0){

        /*set balance in global variable*/
        this.balanceService.changeBalance(this.balance);
        this.subscriptions.add(this.balanceService.setBalance(this.balance).subscribe(response=>response));

        /*if portfolio have item make sum quantety else make push current item*/
        let st = new Stock(element);
        from(this.portfolio)
          .pipe(count((val: IStock) => val.id === element.id))
          .subscribe(count => {
            if(count)
              from(this.portfolio)
                .pipe(findIndex((val: IStock) => val.id === element.id))
                .subscribe(index => {
                  this.portfolio[index].sumQuantety(element.quantety);
                })
                .unsubscribe();
            else{
              this.portfolio.push(st);
            }
          })
          .unsubscribe();

        /*set portfolio in global variable*/
        this.portfolioService.changePortfolio(this.portfolio);
        this.subscriptions.add(this.portfolioService.setPortfolio(this.portfolio).subscribe(response=>response));
      }
    }
  }

}
