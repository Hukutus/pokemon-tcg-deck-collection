import { useQuery } from "react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

import { apiUri } from "./parameters";
import { pokemonApiFetch } from "./fetchFn";
import { PokemonFetchParameters } from "./types";

export const fetchPokemonCards = (
  params: PokemonFetchParameters
): Promise<PokemonTCG.Card[]> => {
  const url = new URL(`${apiUri}/cards`);

  // Set select by default to include only the values used
  url.searchParams.set(
    "select",
    "id,name,supertype,subtypes,legalities,types,images,set.id"
  );

  // Only get 100 results max by default
  url.searchParams.set("pageSize", "100");

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return pokemonApiFetch(url);
};

/*
 * set.name:generations subtypes:mega
 */
export const useFetchPokemonCards = (params: PokemonFetchParameters) => {
  return useQuery(["fetchPokemonCard", params], () =>
    params.q ? fetchPokemonCards(params) : []
  );
};
