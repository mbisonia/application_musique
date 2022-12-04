import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NativeAudio } from '@capgo/native-audio';
import { MusiqueService } from '../musique/musique.service';
import { throws } from 'assert';
export let variable = {
  obj : {}
 }

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})


export class PlayerPage implements OnInit {

  songs:any
  music:any
  ob:any
  sic:any 
  ide: any;
  playIcon = 'pause-circle-outline';
  repIcon = 'repeat-outline';
  soundIcon ='volume-mute-outline';
  duration: any=-1;
  curseur!: number;
  temprestant!: string;
  id_album: any;
  images:any;
  urle:any;
  vol=0.4;
  stop = 1;
  isPlay=0;
  song:any;
	sik3:any;
  sik1: any;
  get_position:any
  last_position:any
  position:any=0;
  varvolhaut:number = 1;
  varvolbas:number = 0;
  obj1:any
  curr_playing_file: any;
  constructor(private songservice: MusiqueService) {}

ngOnInit( ) {
  this.ob = JSON.parse(localStorage.getItem('key') as string)
  localStorage.removeItem('key')
  this.obj1 = JSON.parse(localStorage.getItem('key1') as string)

  this.Song(this.ob)
  this.play(this.ob)
  this.pausesong(this.ob)
  this.charger(this.ob)
  this.playPause(this.ob)
  setTimeout(() => {
 this.duratio(this.ob)
  }, 1000);
  this.volumehaut(this.ob)
  this.volumebas(this.ob)
  this.repeat(this.ob)
  this.volumemuet(this.ob)
  this.volumeonof(this.ob)
  setInterval(()=>{
    this.getinterval(this.ob)
  })
  this.fin(this.ob)
}


Song(id:any){
  this.songservice.getImage2().subscribe((rep:any)=>{
    this.songs = rep;
    this.sic = this.songs.filter((x:{id: any;})=>x.id==this.ide);
  this.music = this.songs.filter((x:{album_id:any})=>x.album_id ==id);
    
})
};
 albumsong(){
  this.songservice.getImage2().subscribe((rep:any)=>{
    this.songs = rep;
  this.music = this.songs.filter((x:{album_id:any})=>x.album_id ==this.ide);  
})
};



next(){
this.fin(this.ob);
//console.log(this.obj1);
// console.log(this.obj1.length)

for (let i = 0 ; i< this.obj1.length; i++){
  //console.log(this.ob.id);
  if(this.ob.id==this.obj1[i].id)
  {
    console.log(this.ob.id);
    if(i==this.obj1.length-1){
      // this.fin(obj)
      this.ob = this.obj1[0]

      this.play(this.obj1[0])
      console.log(this.ob);
    }else{
      this.ob = this.obj1[i+1]
      this.play(this.obj1[i+1])
      console.log(this.ob);
    }
    i= this.obj1.length
  }
}
}
preview(){
this.fin(this.ob);
// console.log(this.obj1);
//console.log(this.obj1.length)

for (let i = 0 ; i< this.obj1.length; i++){
 // console.log(this.ob.id);
  if(this.ob.id==this.obj1[i].id)
  {
    //console.log(this.ob.id);
    if(i==0){
      this.fin(this.ob)
      this.ob = this.obj1[this.obj1.length-1]
      this.play(this.obj1[this.obj1.length-1])
     // console.log(this.ob);
    }else{
      this.ob = this.obj1[i-1]
      this.play(this.obj1[i-1])
     // console.log(this.ob);
    }
    i= this.obj1.length
  }}
}

async getinterval(encour:any){
  let self = this;
  let diff:any=1

 await NativeAudio.getCurrentTime({
    assetId: encour.id.toString(),
  })
  .then(resul => {
    // console.log(resul.currentTime);
    this.position = resul.currentTime
    // console.log("un1");
    
    if (this.position >= 0 && resul < self.duration) {
      // console.log(this.position);
      if (Math.abs(this.last_position - this.position) >= diff) {
        // console.log("un1");
        // set position
        self.curr_playing_file.seekTo(this.last_position * 1000);
      } else {
        // update position for display
        self.position = resul;
        console.log("deux");
      }
    } else if (this.position >= self.duration) {
      console.log("trois");
      self.fin(encour);
      self.next();
    }
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

controlSeconds(action:any,ob:any){
  let step = 15;

  let number = this.position;
  switch (action) {
    case 'back':
      this.position = number < step ? 0.001 : number - step;
      break;
    case 'forward':
      this.position =
        number + step < this.duration ? number + step : this.duration;
        break;
    default:
      break;
  }
}
async play(ms:any){
  // await this.charger(ms)
  this.fin(variable.obj)
  variable.obj = ms
  this.duratio(variable.obj)
  await NativeAudio.play({ 
    assetId: ms.id.toString(), 
    time: 0.0 
    });
    
}
playPause(ms:any) {
  if(this.playIcon == 'pause-circle-outline'){
    this.playIcon = 'play-outline'
    this.pausesong(ms);
  }else{
    this.playIcon = 'pause-circle-outline'
    this.playsong(ms);
  }
}
async playsong(ms:any){
  this.isPlay=1
  await NativeAudio.resume({
    assetId: ms.id.toString(),
  })
}
async unload(ms:any) {
await NativeAudio.unload({
  assetId: ms.id.toString(),
});
}

async pausesong(ms:any){
  this.isPlay=0
  await NativeAudio.pause({
    assetId: ms.id.toString(),

  })
 }

 async duratio(ms:any){
  await NativeAudio.getDuration({
    assetId: ms.id.toString()

  })
  .then(result => {
    this.duration = result.duration
    // console.log(result.duration);
  })
  
}

async repeat(ms:any){
  await NativeAudio.loop({ 
    assetId: ms.id.toString(),})
}
async volumebas(ms:any){
  this.vol = this.vol-0.4;
  await NativeAudio.setVolume({
    assetId: ms.id.toString(),
    volume: this.vol
  })
}
async volumehaut(ms:any){
  this.stop=1;
  this.vol = this.vol+0.3;
  await NativeAudio.setVolume({
    assetId: ms.id.toString(),
    volume: this.vol
  })
  

}
async volumemuet(ms:any){
  this.stop=0;
  await NativeAudio.setVolume({
    assetId: ms.id.toString(),
    volume: 0.0
  })

}

async revolum(ms:any){
  this.stop=0;
  await NativeAudio.setVolume({
    assetId: ms.id.toString(),
    volume: 1
  })
}

volumeonof(ms:any){
  if(this.soundIcon == 'volume-mute-outline'){
    this.soundIcon = 'volume-mute-sharp'
    this.revolum(ms);
  }else{
    this.soundIcon = 'volume-mute-outline'
    this.volumemuet(ms);
  }
}
async fin(Object:any){
  await NativeAudio.stop({
    assetId: Object.id.toString()
  })
}
}
