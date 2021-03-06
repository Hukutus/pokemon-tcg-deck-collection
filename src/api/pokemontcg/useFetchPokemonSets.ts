import { useQuery } from "react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

import { apiUri } from "./parameters";
import { pokemonApiFetch } from "./fetchFn";
import { PokemonFetchParameters } from "./types";

export const fetchPokemonSets = (
  params: PokemonFetchParameters
): Promise<PokemonTCG.Set[]> => {
  const url = new URL(`${apiUri}/sets`);

  // Set select by default to include only the values used
  url.searchParams.set(
    "select",
    "id,name,legalities,ptcgoCode,releaseDate,images"
  );

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return pokemonApiFetch(url);
};

export const useFetchPokemonSets = (params: PokemonFetchParameters) => {
  return useQuery(["fetchPokemonSets", params], () => fetchPokemonSets(params));
};
