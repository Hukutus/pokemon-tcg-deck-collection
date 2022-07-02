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
    updateCardStore: (state, { payload }: PayloadAction<PokemonTCG.Card[]>) => {
      state.value = payload;
    },
    clearCardStore: (state) => {
      state.value = undefined;
    },
  },
});

export const { updateCardStore, clearCardStore } = cardsSlice.actions;

export const selectCards = (state: RootState) => state.cards.value;

export default cardsSlice.reducer;
