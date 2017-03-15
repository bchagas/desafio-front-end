import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()

export class EventBusService {
  @Output() receivedData: EventEmitter<any> = new EventEmitter(true);

  constructor( ) { }

  post(data) {
    this.receivedData.emit(data);
  }
}