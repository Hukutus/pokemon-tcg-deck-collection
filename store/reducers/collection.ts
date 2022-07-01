import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export type CollectionDeck = {
  name: string;
  ptcgoList: string;
  size: number; // Calculated size of the deck

  cards: {
    // Cards in the deck grouped by id
    id: string;
    amount: number;
  }[];

  borrowed: {
    // Cards that are either borrowed to this deck or from this deck
    id: string;
    deckName: string;
    target: "to" | "from";
  }[];
};

export type CollectionCard = {
  id: string;
  name: string;
  image: string;
  owned: number;
};

export interface CollectionState {
  value: {
    cards: CollectionCard[];
    decks: CollectionDeck[];
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
    addCard: (state, { payload }: PayloadAction<PokemonTCG.Card>) => {
      const { id, name, images } = payload;
      const existingCardIndex = state.value.cards.findIndex(
        (card) => card.id === id
      );
      if (existingCardIndex === -1) {
        state.value.cards.push({
          id,
          name,
          image: images.small,
          owned: 1,
        });
      } else {
        state.value.cards[existingCardIndex].owned += 1;
      }
    },
    removeCard: (state, { payload }: PayloadAction<CollectionCard>) => {
      const { id } = payload;
      const existingCardIndex = state.value.cards.findIndex(
        (card) => card.id === id
      );

      if (existingCardIndex === -1) {
        // Not in collection
        return;
      }

      if (state.value.cards[existingCardIndex].owned === 1) {
        // Last card being removed
        state.value.cards.splice(existingCardIndex, 1);
        return;
      }

      // Subtract a card
      state.value.cards[existingCardIndex].owned -= 1;
    },
  },
});

export const { addCard, removeCard } = collectionSlice.actions;

export const selectCollection = (state: RootState) => state.collection.value;
export const selectCollectionCards = (state: RootState) =>
  state.collection.value.cards;
export const selectCollectionDecks = (state: RootState) =>
  state.collection.value.decks;

export default collectionSlice.reducer;
