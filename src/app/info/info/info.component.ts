import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventBusService } from '../../services/event-bus.service';
import { AppConsts } from '../../app.consts';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  subscribe: any;
  distance: string;
  duration: string;
  tollFees: number;
  dataLoaded = false;

  constructor(
    public eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.subscribe = this.eventBus.receivedData.subscribe(event => {
      if (event.action === AppConsts.UPDATE_INFO) {
        this.formatTime(event.data.duration);
        this.formatDistance(event.data.distance);
        this.calculateTollFees(event.data.tollFees);
        this.dataLoaded = true;
      }
    });
  }

  private formatTime(time) {
    const date = new Date(null);
    date.setSeconds(time);
    this.duration = date.toISOString().substr(11, 8);
  }

  private formatDistance(distance) {
    const kilometers = distance / 1000;
    this.distance = kilometers.toFixed(2);
  }

  private calculateTollFees(tollFees) {
    let fee = 0;

    tollFees.map(tollFee => {
      fee += tollFee.prices[0].pricesAtHourRange[0].price;
    });

    this.tollFees = fee;
  }
}
