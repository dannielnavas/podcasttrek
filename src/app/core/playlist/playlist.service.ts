import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episodies } from '../models/episodies';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylist(): Observable<Episodies[]> {
    return this.http.get<Episodies[]>('../../../assets/episodies.json');
  }
}
