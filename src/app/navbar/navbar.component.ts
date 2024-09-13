import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgFor, NgForOf} from "@angular/common";

interface NavItem {
  name: String;
  icon: String;
  href: String;
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgFor
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{

  games! :       any;
  errorMessage! :String;

  navItems: NavItem[] = [
    { name: 'Articles', icon: 'bi-newspaper', href: '/articles' },
    { name: 'Campagne vote', icon: 'bi-trophy', href: '/campagnes' },
    { name: 'Tournaments', icon: 'bi-sword', href: '/tournaments' },
  ];

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
   this.http.get("http://localhost:8081/api/games").subscribe({
     next : (data) => {
       console.log(data);
       this.games = data;
     },
     error : err => {
       this.errorMessage = err.message;
     }
   })
  }


  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


}
