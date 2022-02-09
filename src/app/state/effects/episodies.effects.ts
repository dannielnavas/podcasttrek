import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { PlaylistService } from "src/app/core/playlist/playlist.service";

@Injectable()
export class EpisodiesEffects {
  loadEpisodies$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[Load Episodies] Load Episodies"),
      mergeMap(() =>
        this.playlistService.getPlaylist().pipe(
          map((episodies) => ({
            type: "[Episodies List] Add list of Episodies",
            episodies,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private playlistService: PlaylistService
  ) {}
}
