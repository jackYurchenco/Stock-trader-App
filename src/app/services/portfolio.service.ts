import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() {}

  private _portfolio = new BehaviorSubject([]);
  portfolio = this._portfolio.asObservable();

  changePortfolio(items: any[]){
    this._portfolio.next(items)
  }

}
