import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { MusiqueService } from '../musique/musique.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
public musique : any;
  constructor(private serviceMusique : MusiqueService) { }

  ngOnInit() {
   this.serviceMusique.getImage().subscribe((resul : any)=>{
    this.musique = resul.album;
   })
  }

 albumDetail(obj : any) : void{
  localStorage.setItem('key', JSON.stringify(obj))
 }
}
