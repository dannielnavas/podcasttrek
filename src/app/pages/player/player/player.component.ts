import { Component, OnInit } from '@angular/core';
import { Episodies } from 'src/app/core/models/episodies';
import { PlaylistService } from 'src/app/core/playlist/playlist.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  episodies: Episodies[];
  caratula =
    'https://image.tmdb.org/t/p/original/blS50XLuAEXXrT4ykfLm3FsQCwc.jpg';
  title = 'Titulo de prueba';
  play: Episodies;
  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.getPlaylistALl();
  }

  getPlaylistALl(): void {
    this.playlistService
      .getPlaylist()
      .subscribe((episodies: any) => (this.episodies = episodies));
  }
  selectSong(event: Episodies): void {
    console.log(event);
    this.play = event;
    this.caratula = event.urlImage;
    this.title = event.title;
  }
}
