import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";


export interface IStock {
  category: string;
  id      : number;
  name    : string;
  price   : string;
  quantety: number;
}

export class Stock{
  category: string = '';
  id      : number = 0;
  name    : string = '';
  price   : string = '';
  quantety: number = 0;
  constructor(stock: IStock) {
    this.category = stock.category;
    this.id       = stock.id;
    this.name     = stock.name;
    this.price    = stock.price;
    this.quantety = stock.quantety;
  }
  sumQuantety(num: number){
    this.quantety += num;
  }
  subtractQuantety(num: number){
    if(this.quantety - num >= 0){
      this.quantety -= num;
      return true;
    }
     return false;
  }
}

@Injectable({
  providedIn: 'root'
})

export class StockService {

  constructor(private httpService : HttpService) { }

  getStock(){
    return this.httpService.get()
  }


}
