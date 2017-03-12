import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  constructor(
    private api: ApiService
  ) { }

  search(address: string) {
    return this.api.get('/search', address).map(response => response.json());
  }
}
