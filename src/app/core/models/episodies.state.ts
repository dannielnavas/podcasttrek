import { Episodies } from "./episodies";

export interface EpisodiesState {
    loading: boolean;
    episodies: ReadonlyArray<Episodies>;
}