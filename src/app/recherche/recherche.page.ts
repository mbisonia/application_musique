import { Component, OnInit } from '@angular/core';
import { MusiqueService } from '../musique/musique.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.page.html',
  styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {
public recuper : any;
public m : any;
public rec : any;
public t : any;
public resultat : any;
  constructor(private serviceMusique : MusiqueService) { }

  ngOnInit() {
    this.serviceMusique.getImage2().subscribe((rep : any)=>{
      this.rec = rep.song;
    });
    console.log("recup", this.rec)
  }
  searchItem(event : any){
    let val = event.target.value;
    this.resultat = this.rec.filter((item : any)=>{
      let txtNom = item.titre;
      return txtNom.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    console.log("dddd", this.resultat);
  }

}
