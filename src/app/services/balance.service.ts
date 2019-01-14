import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpService} from "./http.service";
export const BALANCE = 0;
@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private httpService : HttpService) { }

  private _balance = new BehaviorSubject<number>(BALANCE);
  currentBalance = this._balance.asObservable();

  changeBalance(balance: number){
    this._balance.next(balance)
  }
  getBalance(){
    return this.httpService.get('balance')
  }
  setBalance(balance){
    return this.httpService.set('balance', { "total" : balance });
  }
}

