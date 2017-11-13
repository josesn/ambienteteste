import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

/*
  Generated class for the HospedagemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HospedagemProvider {

  private urlBase = 'http://localhost:8000'
  private urlHosp = '/hospedagem'

  constructor(public http: Http) {
    console.log('Hello HospedagemProvider Provider');
  }

  public getAllHospedagem(): Observable<any> {
    let url = this.urlBase + this.urlHosp
    return this.http.get(url)
            .map(this.dataHandler)
            
  }

  public dataHandler (res: Response) {
    let hosp = res.json();
    return {lista: hosp};
  }

}