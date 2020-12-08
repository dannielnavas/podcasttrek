import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Episodies } from '../models/episodies';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient, private storage: AngularFireStorage) {}

  getPlaylist(): Observable<Episodies[]> {
    return this.http.get<Episodies[]>('../../../assets/episodies.json');
  }
  referenciaCloudStorage(nombreArchivo: string): any {
    return this.storage.ref(nombreArchivo);
  }
}
