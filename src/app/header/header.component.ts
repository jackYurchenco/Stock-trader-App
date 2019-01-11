import { Component, OnInit } from '@angular/core';
import {BalanceService} from "../services/balance.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  private _balance: number = 0;
  constructor(private balanceService : BalanceService) {
    this.balanceService.currentBalance.subscribe(balance => this._balance = balance);
  }

  ngOnInit() {
  }

}
