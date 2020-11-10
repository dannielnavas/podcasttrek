import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { Episodies } from 'src/app/core/models/episodies';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit, OnChanges {
  @Input() play: Episodies;
  playSong: Episodies;
  reproductor = new Audio();
  duracion: string;
  realDuracion: number;
  segundo: number;
  icon = 'fa fa-pause';
  volumenAction: string;
  constructor() {}

  ngOnInit(): void {
    console.log(this.play);
    if (this.play) {
      this.playSong = this.play;
      console.log(this.playSong);
      this.selectAudio(this.playSong);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.play) {
      this.playSong = this.play;
      console.log(this.playSong);
      this.selectAudio(this.playSong);
    }
  }

  selectAudio(element: Episodies): void {
    // this.actual = this.playSong.urlEpisodie;
    this.getDuration(this.reproductor);
    this.reproductor.src = element.urlEpisodie;
    this.reproductor.load();
    this.reproductor.play();
    this.reproductor.volume = 40 / 100;
    this.getSeconds();
  }

  getDuration(player): void {
    let d: string;
    player.onloadedmetadata = () => {
      this.realDuracion = this.reproductor.duration;
      let duracion = Math.round(this.reproductor.duration) / 60;
      duracion = (duracion * 100) / 100;
      d = String(duracion);
      this.duracion = d.replace('.', ':');
      console.log(this.duracion);
    };
  }

  getSeconds(): void {
    const int = interval(1000);
    const subscription = int
      .pipe(switchMap(async () => this.reproductor.currentTime ))
      .subscribe(val => {
        this.segundo = val;
        if (this.segundo === this.realDuracion) {
          // this.nextSong();
        }
      });
  }

  playAndPause(): void {
    if (!this.reproductor.paused) {
      this.reproductor.pause();
      this.icon = 'fa fa-play';
    } else {
      this.reproductor.play();
      this.icon = 'fa fa-pause';
    }
  }

  setTime(event): void {
    this.reproductor.currentTime = event.target.value;
  }

  volumen(event): void {
    console.log(event);
    if (this.reproductor.volume > (event.target.value / 100 )) {
      this.volumenAction = 'volume_down';
    } else {
      this.volumenAction = 'volume_up';
    }
    this.reproductor.volume = event.target.value / 100;
    console.log(this.reproductor.volume);
  }

  // nextSong() {
  //   const estado = this.actual.id - 1;
  //   if (this.miAudio.length > this.actual.id) {
  //     this.selectAudio(this.miAudio[estado + 1]);
  //     this.iconNext = 'skip_previous';
  //   } else {
  //     this.selectAudio(this.miAudio[estado - 1]);
  //     this.iconNext = 'skip_next';
  //   }
  // }
  // volumenOf() {
  //   if (this.volumenAction !== 'volume_off') {
  //     this.volumenAction = 'volume_off';
  //     this.reproductor.volume = 0;
  //   } else {
  //     this.volumenAction = 'volume_down';
  //     this.reproductor.volume = 30 / 100;
  //   }
  // }
}
