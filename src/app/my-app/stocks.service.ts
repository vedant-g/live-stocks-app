import { Injectable } from '@angular/core';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor() { }

  getStocksData$(): Rx.Subject<string> {
  
    let subject = new Rx.Subject<string>();
    let ws = new WebSocket('ws://stocks.mnet.website');
    ws.onmessage = function (e) {
      return subject.next(e.data)
    };
    return subject;
  }
}
