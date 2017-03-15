import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SearchService {
  constructor(
    private api: ApiService
  ) { }

  search(address: Observable<string>) {
    return address.debounceTime(400)
           .distinctUntilChanged()
           .flatMap(addr =>
              this.api.get('/search', addr)
                      .map(response => response.json())
            );
  }
}
