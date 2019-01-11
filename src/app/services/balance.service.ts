import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
export const BALANCE = 10000;
@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  private _balance = new BehaviorSubject<number>(BALANCE);
  currentBalance = this._balance.asObservable();

  changeBalance(balance: number){
    this._balance.next(balance)
  }
}

