import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeAudio } from '@capacitor-community/native-audio';
import { cachedDataVersionTag } from 'v8';
import { MusiqueService } from '../musique/musique.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  search:any = "";
  time: any
  data: any
  songs:any
  song:any
  musique:any
  obj:any
  album_id: any;
  rop:any
  constructor(private route: ActivatedRoute, private router: Router,private musiqueservice:MusiqueService) {}

  ngOnInit() {
    this.obj = JSON.parse(localStorage.getItem('key') as string)
    localStorage.removeItem('key')
    // console.log(this.obj.id)
    this.listeSong(this.obj.id)
  }

  listeSong(id:any){
    this.musiqueservice.getImage2().subscribe((rep:any)=>{
      this.songs = rep.song;
      console.log(this.songs)
    this.musique = this.songs.filter((x:{id_album:any})=>x.id_album ==id);
    localStorage.setItem('key1', JSON.stringify(this.musique))
      console.log(this.musique)
      this.musique.forEach((el:any) => {
        this.charger(el)
      });
      console.log("siom", this.musique);
      
     
  })
  }

  async charger(ms:any){
    await NativeAudio.preload({ 
      assetId: ms.id.toString(),
      assetPath: ms.url,
      audioChannelNum: 1, 
      isUrl: false
      });
      // this.duratio(ms.url)
  }
t= setInterval(()=> {
  this.musique.forEach(async (el:any) => {
    el.time =(await this.duratio(el)).duration
  });
},1000)


  async duratio(ms:any){
    return NativeAudio.getDuration({
      assetId: ms.id.toString()
    })
    
  }

  sondetail(obj:any):void{
    localStorage.setItem('key', JSON.stringify(obj))
    // console.log(localStorage.setItem('key', JSON.stringify(obj)))
  }
}
