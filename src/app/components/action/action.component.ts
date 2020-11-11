import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { Episodies } from 'src/app/core/models/episodies';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input() play: Episodies;
  @Input() capitulos: Episodies[];
  @Output() changeCaraturla = new EventEmitter<string>();
  playSong: Episodies;
  reproductor = new Audio();
  duracion: string;
  realDuracion: number;
  segundo: number;
  icon = 'fa fa-pause';
  volumenAction: string;
  constructor() {}

  ngOnInit(): void {
    if (this.play) {
      this.playSong = this.play;
      this.selectAudio(this.playSong);
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    // tslint:disable-next-line: forin
    for (const propName in changes) {
      console.log(propName);
    }
    if (this.play) {
      this.playSong = this.play;
      this.selectAudio(this.playSong);
    }
  }

  caratulaEpisodie(caratula: string): void {
    this.changeCaraturla.emit(caratula);
  }

  selectAudio(element: Episodies, accion?: boolean): void {
    // this.actual = this.playSong.urlEpisodie;
    this.getDuration(this.reproductor);
    this.reproductor.src = element.urlEpisodie;
    this.reproductor.load();
    this.reproductor.play();
    this.reproductor.volume = 40 / 100;
    this.getSeconds(element.id);
    accion ? this.play = element : this.play = this.play;
  }

  getDuration(player): void {
    let d: string;
    player.onloadedmetadata = () => {
      this.realDuracion = this.reproductor.duration;
      let duracion = Math.round(this.reproductor.duration) / 60;
      duracion = (duracion * 100) / 100;
      d = String(duracion);
      this.duracion = d.replace('.', ':');
    };
  }

  getSeconds(id: number): void {
    const int = interval(1000);
    const subscription = int
      .pipe(switchMap(async () => this.reproductor.currentTime ))
      .subscribe(val => {
        this.segundo = val;
        if (this.segundo === this.realDuracion) {
          this.nextSong(id, true);
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
    if (this.reproductor.volume > (event.target.value / 100 )) {
      this.volumenAction = 'volume_down';
    } else {
      this.volumenAction = 'volume_up';
    }
    this.reproductor.volume = event.target.value / 100;
  }

  nextSong(id: number, action: boolean): void {
    if (this.capitulos.length > id - 1) {

      if(action) {
        this.caratulaEpisodie(this.capitulos[id].urlImage);
        this.selectAudio(this.capitulos[id], true);
      } else {
        this.caratulaEpisodie(this.capitulos[id - 2].urlImage);
        this.selectAudio(this.capitulos[id - 2], true);
      }
    }
  }
}
