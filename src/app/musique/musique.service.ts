import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusiqueService {

  constructor(private httpClient : HttpClient) { }
  getImage(){
    return this.httpClient.get('assets/album.json');
  }

  getImage2(){
    return this.httpClient.get('assets/songs.json');
  }
}
