import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export type ResponseStatus = {
  loading: boolean;
  error: unknown;
};

export type PokemonCardResponse = ResponseStatus & {
  card?: PokemonTCG.Card;
};

export type PokemonCardsResponse = ResponseStatus & {
  cards: PokemonTCG.Card[];
};

export type PokemonSetsResponse = ResponseStatus & {
  sets: PokemonTCG.Set[];
};
