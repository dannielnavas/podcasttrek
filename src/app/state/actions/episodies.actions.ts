import { createAction, props } from '@ngrx/store';
import { Episodies } from 'src/app/core/models/episodies';

export const loadEpisodies = createAction(
  '[Load Episodies] Load Episodies',
);
 
export const addEpisodies = createAction(
  '[Episodies List] Add list of Episodies',
  props<{ episodies: Episodies[] }>()
);
