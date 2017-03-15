import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EventBusService } from '../services/event-bus.service';
import { SearchService } from '../services/search.service';
import { AppConsts } from '../app.consts';

import 'rxjs/add/observable/of';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent {
  @Input() placeholder: string;
  @Input() direction: string;

  address = new FormControl();
  displaySearchResults = false;
  addresses: Observable<Array<string>>;

  constructor(
    private searchService: SearchService,
    private eventBus: EventBusService
  ) {
    this.searchService
        .search(this.address.valueChanges)
        .subscribe(response => this.formatResult(response.results));
  }

  setAddress(event) {
    const dataSet = event.target.dataset;
    this.address.patchValue(event.target.textContent.trim(), { emitEvent: false });
    this.eventBus.post(
      {
        action: AppConsts.SET_DIRECTION,
        direction: dataSet.direction,
        data: JSON.parse(dataSet.rawAddress)
      }
    );
    this.displaySearchResults = false;
  }

  private formatResult(result) {
    const resultAddresses = [];

    result.map(address => {
      resultAddresses.push(
        {
          display_name: address.displayName,
          raw_data: JSON.stringify(address)
        }
      );
    });

    this.addresses = Observable.of(resultAddresses);
    this.displaySearchResults = true;
  }
}
