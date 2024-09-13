import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {catchError, Observable, throwError} from "rxjs";
import {ArticlesService} from "../services/articles.service";
import {Article} from "../model/article.model";
import EventEmitter from "events";
import {VotebuttonComponent} from "./votebutton/votebutton.component";
import {VoteModel} from "../model/vote.model";

@Component({
  selector: 'app-article-compagne',
  standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        RouterLink,
        JsonPipe,
        NgClass,
        VotebuttonComponent
    ],
  templateUrl: './article-compagne.component.html',
  styleUrl: './article-compagne.component.scss'
})
export class ArticleCompagneComponent implements OnInit {

    idCompagne !: String;
    idArticleVoted!:String;
  articles!: Observable<Array<Article>>;
  errorMessage!: String;
   vote! : VoteModel;
  constructor(private route: ActivatedRoute,
              private articleService: ArticlesService) {
  }

  ngOnInit(): void {
     this.idCompagne = this.route.snapshot.params['idCompagne'];
     this.articles= this.articleService.getArticleById(this.idCompagne).pipe(
       catchError( err => {
         this.errorMessage = err.message;
         return throwError(err);
       })
     );
  }

    onVote(articleId: String): void {
        this.idArticleVoted = articleId;
        console.log(articleId);
        this.vote = {idArticle:this.idArticleVoted,
            idCampagne : this.idCompagne,
            idMembre :  "eea19221-7f41-4085-8901-f46c579cfd9b",};
        this.articleService.voteArticle(this.vote)
                .subscribe({
                    next : data => {console.log(data)},
                    error: err => {console.log(err)}
                })
    }


}
