import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export type TCollectionDeck = {
  name: string;
  ptcgoList: string;
  amount: number;
  cards: TCollectionCard[];
  format?: "Standard" | "Expanded" | "Unlimited" | "GLC";

  // WIP, not yet used
  borrowed?: {
    id: string;
    deckName: string;
    target: "to" | "from";
  }[];
};

export type TCollectionCard = {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  amount: number;
};

export interface CollectionState {
  value: {
    cards: TCollectionCard[];
    decks: TCollectionDeck[];
  };
  status: "idle" | "loading" | "failed";
}

const initialState: CollectionState = {
  value: {
    cards: [],
    decks: [],
  },
  status: "idle",
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCard: (
      state,
      { payload }: PayloadAction<PokemonTCG.Card | TCollectionCard>
    ) => {
      const { id, name, images } = payload;
      const existingCardIndex = state.value.cards.findIndex(
        (card) => card.id === id
      );
      if (existingCardIndex === -1) {
        state.value.cards.push({
          id,
          name,
          images,
          amount: 1,
        });
      } else {
        state.value.cards[existingCardIndex].amount += 1;
      }
    },
    removeCard: (state, { payload }: PayloadAction<TCollectionCard>) => {
      const { id } = payload;
      const existingCardIndex = state.value.cards.findIndex(
        (card) => card.id === id
      );

      if (existingCardIndex === -1) {
        // Not in collection
        return;
      }

      if (state.value.cards[existingCardIndex].amount <= 1) {
        // Last card being removed
        // state.value.cards.splice(existingCardIndex, 1);
        state.value.cards[existingCardIndex].amount = 0;
        return;
      }

      // Subtract a card
      state.value.cards[existingCardIndex].amount -= 1;
    },
    deleteCard: (state, { payload }: PayloadAction<TCollectionCard>) => {
      const { id } = payload;
      const existingCardIndex = state.value.cards.findIndex(
        (card) => card.id === id
      );

      if (existingCardIndex === -1) {
        // Not in collection
        return;
      }

      state.value.cards.splice(existingCardIndex, 1);
    },
  },
});

export const { addCard, removeCard, deleteCard } = collectionSlice.actions;

export const selectCollection = (state: RootState) => state.collection.value;
export const selectCollectionCards = (state: RootState) =>
  state.collection.value.cards;
export const selectCollectionDecks = (state: RootState) =>
  state.collection.value.decks;

export default collectionSlice.reducer;
