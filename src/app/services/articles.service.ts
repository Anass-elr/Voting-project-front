import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../model/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http:HttpClient) { }

  public getArticleById(id:String) : Observable<Array<Article>>{
     return this.http.get<Array<Article>>("http://localhost:8081/api/articles/"+id)
  }

  public getArticles() : Observable<Array<Article>>{
    return this.http.get<Array<Article>>("http://localhost:8081/api/leagueArticles")
  }

  public getArticlesByGame(gameName:String):Observable<Array<Article>>{
      return this.http.get<Array<Article>>("http://localhost:8081/api/articles/gameName/"+gameName)
  }

}
