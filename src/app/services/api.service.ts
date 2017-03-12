import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

import { SignatureService } from './signature.service';

@Injectable()

export class ApiService {
  constructor(
    private http: Http,
    private signatureService: SignatureService
  ) { }

  get(resource, params) {
    const requestUrl = this.buildUrlWithSignature(resource, params);

    return this.http.get(requestUrl);
  }

  private buildUrlWithSignature(resource, params, type: string = 'search') {
    const urlWithResource = `${environment[`api_${type}_endpoint`]}${resource}`;
    const parser = document.createElement('a');

    const query = `q=${params}`;
    const limit = `limit=${environment.search_limit}`;
    const types = 'types=address,street';
    const acode = `applicationCode=${environment.api_code}`;

    parser.href = `${urlWithResource}?${query}&${limit}&${types}&${acode}`;

    const signature = this.signatureService.sign(parser);

    return `${parser.href}&signature=${signature}`;
  }

  private headers() {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
