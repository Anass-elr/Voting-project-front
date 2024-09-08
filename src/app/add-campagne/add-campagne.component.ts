import {Component, OnInit} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {CampagneService} from "../services/campagne.service";
import {ArticlesService} from "../services/articles.service";
import {Article} from "../model/article.model";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import e from "express";
import {Campagne} from "../model/campagne.model";

@Component({
  selector: 'app-add-campagne',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './add-campagne.component.html',
  styleUrl: './add-campagne.component.css'
})
export class AddCampagneComponent implements OnInit{

  games!        : Observable<Array<any>>;
  countries!    : Observable<Array<any>>;
  articles!     : Observable<Array<Article>>
  errorMessage! :String;
  gameSelected! : String;
  articlesChecked : Array<String> = [];
  articleId ! : String;
  campagneAdded! : Campagne;

  formCampagne  = this.fb.group({
    name : ["",Validators.required],
    dateDebut : ["",Validators.required],
    dateFin: ["",Validators.required],
    countryName : ["",Validators.required],
    gameName : ["",Validators.required],
  });


  constructor(private campagneService:CampagneService,
              private articleService:ArticlesService,
              private fb : FormBuilder) {
  }

  ngOnInit(): void {

    this.games= this.campagneService.getGames().pipe(
      catchError( err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

    this.countries= this.campagneService.getCountries().pipe(
      catchError( err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }


  public onChangeGame(e:any){
    this.gameSelected = e.target.value;

     this.articles = this.articleService.getArticlesByGame(this.gameSelected).pipe(
       catchError( err => {
         this.errorMessage = err.message;
         return throwError(err);
       })
     );
  }

  public onSelectArticle($event:any){
    console.log($event.target.value, $event.target.checked);
    this.articleId = $event.target.value;

    if($event.target.checked){
      this.articlesChecked.push(this.articleId);
    }
    else{
      this.articlesChecked = this.articlesChecked.filter(
        (article)=> article !=this.articleId);
    }
    console.log(this.articlesChecked);
  }

  public onSubmit(){
    console.log(this.formCampagne.value, this.formCampagne.invalid );
    if(!this.formCampagne.invalid ){
        let campagne : Campagne = this.mapFormToModel();
        console.log(campagne);
        this.campagneService.postCampagne(campagne).subscribe();
    }
  }

  private mapFormToModel(): Campagne {
    return {
      id:'' ,
      dateDebut      : this.parseDate(this.formCampagne.value.dateDebut),
      dateFin        : this.parseDate(this.formCampagne.value.dateFin),
      countryName    : this.formCampagne.value.countryName?? '',
      gameName       : this.formCampagne.value.gameName?? '',
      artilcesSelectedId : this.articlesChecked
    } ;
  }


  // Méthode utilitaire pour convertir une chaîne en Date
  private parseDate(dateString: string | null | undefined): Date {
    // Convertir la chaîne en Date ou retourner une date par défaut si invalide
    return dateString ? new Date(dateString) : new Date();
  }
}
