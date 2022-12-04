import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MusiqueService } from '../musique/musique.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  
public son : any;
progress = 40;
  constructor(private router : Router, private imageApp : MusiqueService) { }

  ngOnInit() {
    this.imageApp.getImage().subscribe((rep ) => {
      this.son = rep;
      console.log(rep);
      })
  }

  openAlbum(alb: any)
  {
    const titleEscaped = encodeURIComponent(alb.titreA);
    console.log('titleEscaped: ', titleEscaped);
    this.router.navigateByUrl('/home/accueil/${titleEscaped}');
  }
 
    slidesOptions = {
      slidesPerView: 2.4,
      slidesOffsetBefore: 20,
      spaceBetween: 20,
      centeredSlides: true,
      loop:true,
      autoplay:true,
      freeMode: true
  }

  dasherize(nom :string){
    return nom.replace(/[A-Z]/g, function(char, index){
      return (index !== 0 ? '-' : '')+ char.toLowerCase();
    });
  };

}
