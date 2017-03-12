import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var forge;

@Injectable()
export class SignatureService {

  constructor() { }

  sign(params: HTMLAnchorElement) {
    const hmac = forge.hmac.create();
    hmac.start('sha1', atob(environment.api_key));
    hmac.update(`${params.pathname}${params.search}`);

    return btoa(hmac.digest().data).replace('+', '-').replace('/', '_');
  }
}
