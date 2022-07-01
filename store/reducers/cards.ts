import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export interface CardsState {
  value?: PokemonTCG.Card[];
  status: "idle" | "loading" | "failed";
}

const initialState: CardsState = {
  value: undefined,
  status: "idle",
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    update: (state, { payload }: PayloadAction<PokemonTCG.Card[]>) => {
      state.value = payload;
    },
    add: (state, { payload }: PayloadAction<PokemonTCG.Card>) => {
      if (!state.value) {
        state.value = [payload];
        return;
      }

      state.value.push(payload);
    },
    remove: (state, { payload }: PayloadAction<PokemonTCG.Card>) => {
      if (!state.value?.length) {
        state.value = [];
        return;
      }

      state.value = state.value.filter((set) => set.id === payload.id);
    },
  },
});

export const { update, add, remove } = cardsSlice.actions;

export const selectCards = (state: RootState) => state.cards.value;

export default cardsSlice.reducer;
