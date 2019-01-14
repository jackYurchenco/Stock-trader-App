import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
import {Stock} from "./stock.service";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private httpService : HttpService) {}

  private _portfolio = new BehaviorSubject<Stock[]>([]);
  portfolio = this._portfolio.asObservable();

  changePortfolio(items: any[]){
    this._portfolio.next(items)
  }

  getPortfolio(){
    return this.httpService.get('portfolio')
  }

  setPortfolio(portfolio){
    return this.httpService.set('portfolio', {"list" : portfolio});
  }

}
