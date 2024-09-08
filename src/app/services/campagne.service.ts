import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campagne} from "../model/campagne.model";

@Injectable({
  providedIn: 'root'
})

export class CampagneService {

  constructor(private http:HttpClient) {
  }

  public getCampagnes() : Observable<Array<Campagne>>{
     return  this.http.get<Array<Campagne>>("http://localhost:8081/api/campagnes")
  }

  public getCampagneByGameId (id:String) :Observable<Array<Campagne>> {
    return this.http.get<Array<Campagne>>("http://localhost:8081/api/campagnes/byGame/"+id)
  }

  public getCountries() : Observable<Array<any>>{
    return this.http.get<Array<Campagne>>("http://localhost:8081/api/countries")
  }

  public getGames() : Observable<Array<any>>{
    return this.http.get<Array<Campagne>>("http://localhost:8081/api/games")
  }

  public postCampagne(body:Campagne):Observable<any>{
    return this.http.post<any>("http://localhost:8081/api/campagnes",body)
  }

}
