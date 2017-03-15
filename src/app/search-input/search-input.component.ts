import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SearchService } from '../services/search.service';

import 'rxjs/add/observable/of';


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Input() placeholder: string;

  address = new FormControl();
  displaySearchResults = false;
  addresses: Observable<Array<string>>;

  constructor(
    private searchService: SearchService
  ) {
    this.searchService
        .search(this.address.valueChanges)
        .subscribe(response => {
          const resultAddresses = [];
          response.results.map(address => {
            resultAddresses.push(address.displayName);
          });
          this.addresses = Observable.of(resultAddresses);
          this.displaySearchResults = true;
        });
  }

  setAddress(event) {
    this.address.setValue(event.target.textContent);
    this.displaySearchResults = false;
  }
}
