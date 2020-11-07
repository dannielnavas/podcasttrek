import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {
    console.log(this.lista);
  }
  playEpisodie(episodie: Episodies): void {
    console.log(episodie);
    this.newItemEvent.emit(episodie);
  }
}
