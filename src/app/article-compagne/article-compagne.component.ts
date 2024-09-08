import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {catchError, Observable, throwError} from "rxjs";
import {ArticlesService} from "../services/articles.service";
import {Article} from "../model/article.model";

@Component({
  selector: 'app-article-compagne',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    RouterLink,
    JsonPipe
  ],
  templateUrl: './article-compagne.component.html',
  styleUrl: './article-compagne.component.css'
})
export class ArticleCompagneComponent implements OnInit {

  idCompagne!: String;
  articles!: Observable<Array<Article>>;
  errorMessage!: String;

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) {
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

}
