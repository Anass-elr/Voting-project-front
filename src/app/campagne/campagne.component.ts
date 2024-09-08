import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CampagneService} from "../services/campagne.service";
import {catchError, Observable, throwError} from "rxjs";
import {Campagne} from "../model/campagne.model";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-campagne',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    JsonPipe,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './campagne.component.html',
  styleUrl: './campagne.component.css'
})
export class CampagneComponent implements OnInit{

  campagnes! : Observable<Array<Campagne>>;
  errorMessage! :String;
  failureOrLoading: any;
  idGame!:String;

  constructor(private campagneService:CampagneService) {

  }

  ngOnInit(): void {
    this.campagnes =  this.campagneService.getCampagnes().pipe(
      catchError( err => {
         this.errorMessage = err.message;
         return throwError(err);
      })
    );

  }



}
