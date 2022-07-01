import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

export type PokemonCardFetchResponse = {
  loading: boolean;
  error: unknown;
  card?: Card;
};

export type PokemonCardsFetchResponse = {
  loading: boolean;
  error: unknown;
  cards: Card[];
};
