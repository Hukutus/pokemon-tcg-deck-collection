import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export interface SetsState {
  value?: PokemonTCG.Set[];
  status: "idle" | "loading" | "failed";
}

const initialState: SetsState = {
  value: undefined,
  status: "idle",
};

export const setsSlice = createSlice({
  name: "sets",
  initialState,
  reducers: {
    updateSetStore: (state, { payload }: PayloadAction<PokemonTCG.Set[]>) => {
      state.value = payload;
    },
    clearSetStore: (state) => {
      state.value = undefined;
    },
  },
});

export const { updateSetStore, clearSetStore } = setsSlice.actions;

export const selectSets = (state: RootState) => state.sets.value;

export default setsSlice.reducer;
