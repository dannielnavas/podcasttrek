import { Component, EventEmitter, Input, OnInit, Output, HostListener } from '@angular/core';
import { Episodies } from 'src/app/core/models/episodies';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() lista: Episodies[];
  @Output() newItemEvent = new EventEmitter<Episodies>();
  play = 'fa fa-play';
  pause = 'fa fa-pause';
  installEvent = null;

  constructor() {}

  ngOnInit(): void {}
  playEpisodie(episodie: Episodies): void {
    this.newItemEvent.emit(episodie);
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
