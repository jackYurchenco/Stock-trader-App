import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public host: string;

  constructor(private http: Http) {
    this.host = environment.host;
  }

  public get(){
    return this.http.get(this.host);
  }


}
