import { Routes } from '@angular/router';
import {CampagneComponent} from "./campagne/campagne.component";
import {ArticleCompagneComponent} from "./article-compagne/article-compagne.component";
import {AddCampagneComponent} from "./add-campagne/add-campagne.component";

export const routes: Routes = [
  {path : "campagnes", component : CampagneComponent},
  {path : "articles/:idCompagne", component :ArticleCompagneComponent},
  {path : "campagnes/:idGame", component :CampagneComponent},
  {path : "addCampagne", component : AddCampagneComponent }
];

