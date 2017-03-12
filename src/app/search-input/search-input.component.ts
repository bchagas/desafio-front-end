import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SearchService } from '../services/search.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input() placeholder: string;

  address = new FormControl();
  items: Observable<Array<string>>;

  constructor(
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.address.valueChanges
        .debounceTime(600)
        .distinctUntilChanged()
        .switchMap(term => this.searchService.search(term))
        .subscribe(response => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
  }
}
