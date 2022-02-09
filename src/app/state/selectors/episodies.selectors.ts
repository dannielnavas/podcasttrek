import { Episodies } from "src/app/core/models/episodies";
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { EpisodiesState } from "src/app/core/models/episodies.state";

export const selectEpisodies = (state: AppState) => state.episodiesList;

export const selectEpisodiesList = createSelector(
  selectEpisodies,
  (state: EpisodiesState) => state.episodies
);

export const selectLoading = createSelector(
  selectEpisodies,
  (state: EpisodiesState) => state.loading
);
