import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  get(url) {
    return this.http.get(this.buildUrl(url), {
      headers: this.headers()
    });
  }

  post(url, params) {
    return this.http.post(this.buildUrl(url), params, {
      headers: this.headers()
    });
  }

  private buildUrl(resource, type: string = 'search') {
    const url: string = environment[`api_${type}_endpoint`];
    return `${url}?${resource}`;
  }

  private headers() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
