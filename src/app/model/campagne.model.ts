export interface Campagne{
  id             :String;
  dateDebut      : Date;
  dateFin        : Date;
  countryName    : String;
  gameName       : String;
  articlesSelectedId : Array<String>;
}
