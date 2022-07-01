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
    update: (state, { payload }: PayloadAction<PokemonTCG.Set[]>) => {
      state.value = payload;
    },
    add: (state, { payload }: PayloadAction<PokemonTCG.Set>) => {
      if (!state.value) {
        state.value = [payload];
        return;
      }

      state.value.push(payload);
    },
    remove: (state, { payload }: PayloadAction<PokemonTCG.Set>) => {
      if (!state.value?.length) {
        state.value = [];
        return;
      }

      state.value = state.value.filter((set) => set.id === payload.id);
    },
  },
});

export const { update, add, remove } = setsSlice.actions;

export const selectSets = (state: RootState) => state.sets.value;

export default setsSlice.reducer;
