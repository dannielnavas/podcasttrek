import { ActionReducerMap } from '@ngrx/store';
import { Episodies } from 'src/app/core/models/episodies';
import { EpisodiesState } from '../core/models/episodies.state';
import { episodiesReducer } from './reducers/episodies.reducers';

export interface AppState {
  episodiesList: EpisodiesState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    episodiesList: episodiesReducer
}