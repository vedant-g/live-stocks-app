import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';
import { StocksService } from './stocks.service'

@Component({
  selector: 'app-my-app',
  templateUrl: './my-app.component.html',
  styleUrls: ['./my-app.component.css']
})
export class MyAppComponent implements OnInit {

    incData: any;
    subscr: Rx.Subscription;
    dict = new Map();
    ctr = 0;
    dateObj={};
  
    constructor(private stockService:StocksService) {  
    }
  
    cols = [
      { field: 'ticker', header: 'Ticker' },
      { field: 'price', header: 'Price' },
      { field: 'lastUpdate', header: 'Last Update' }
    ]
  
    ngOnInit() {
  
      this.subscr = this.stockService.getStocksData$().subscribe((data) => {
  
        this.ctr++;
        this.incData = JSON.parse(data);
        if (this.ctr == 1) {
          this.incData.forEach(element => {
            this.dict.set(element[0], '0' + element[1]);
            this.dateObj[element[0]]=new Date();
          })
        }
        else {
          if (this.incData != undefined)
            this.incData.forEach(element => {
              if (this.dict.has(element[0])) {
                if (Math.abs(+this.dict.get(element[0])) < element[1]) {
                  this.dict.set(element[0], element[1]);
                  this.dateObj[element[0]]=new Date();
                }
                else {
                  this.dict.set(element[0], -element[1]);
                  this.dateObj[element[0]]=new Date();
                }
              }
              else {
                this.dict.set(element[0], '0' + element[1]);
                this.dateObj[element[0]]=new Date();
              }
            })
  
  
        };
      })
    }
  
    getColor(val) {
  
      if ((val + "").startsWith('0')) {
        return 'white';
      }
      return +val > 0 ? 'green ' : 'red';
    }
  
    ngOnDestroy() {
      this.subscr.unsubscribe();
    }
  
}
