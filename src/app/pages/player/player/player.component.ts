import { Component, OnInit, HostListener } from '@angular/core';
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
    '/assets/sonico.png';
  title = 'Titulo de prueba';
  play: Episodies;
  installEvent = null;
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
    this.play = event;
    this.caratula = event.urlImage;
    this.title = event.title;
  }

  refreshCaratula(event: string): void {
    this.caratula = event;
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event): void {
    event.preventDefault();
    this.installEvent = event;
  }

  installByUser(): void {
    if (this.installEvent) {
      this.installEvent.prompt();
      this.installEvent.userChoice
        .then(rta => {
          console.log(rta);
        });
    }
  }
}
