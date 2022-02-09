import { createReducer, on } from "@ngrx/store";
import { EpisodiesState } from "src/app/core/models/episodies.state";
import { Episodies } from "../../core/models/episodies";
import { addEpisodies, loadEpisodies } from "../actions/episodies.actions";

export const initialState: EpisodiesState = { loading: false, episodies: [] };

export const episodiesReducer = createReducer(
  initialState,
  on(loadEpisodies, (state) => {
    return { ...state, loading: true };
  }),
  on(addEpisodies, (state, { episodies }) => ({
    ...state,
    episodies,
  }))
);
