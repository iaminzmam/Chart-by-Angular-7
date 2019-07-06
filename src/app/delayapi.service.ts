import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DelayapiService {

  constructor(private http: HttpClient) { }

  datafetch() {
    return this.http.get("https://asia-east2-greentoad-bfbb7.cloudfunctions.net/apiIndia/api/angular")
    .pipe(map(result =>result));
  }

}
