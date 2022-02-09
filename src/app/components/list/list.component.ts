import { selectEpisodies, selectEpisodiesList } from './../../state/selectors/episodies.selectors';
import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Episodies } from 'src/app/core/models/episodies';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  lista$: Observable<any> = new Observable();
  @Output() newItemEvent = new EventEmitter<Episodies>();
  play = 'fa fa-play';
  pause = 'fa fa-pause';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getListEpisodies();
  }

  getListEpisodies(): void {
    this.lista$ = this.store.select(selectEpisodiesList);
  }

  playEpisodie(episodie: Episodies): void {
    this.newItemEvent.emit(episodie);
  }
}
