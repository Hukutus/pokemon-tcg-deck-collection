import { apiUri, headers } from "./parameters";
import { useQuery } from "react-query";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

const fetchPokemonCard = (id: string): Promise<PokemonTCG.Card> => {
  return fetch(`${apiUri}/cards/${id}`, {
    headers,
  })
    .then((res) => res.json())
    .then((res) => res?.data);
};

export const useFetchPokemonCard = (id: string) => {
  return useQuery(["fetchPokemonCard", id], () => fetchPokemonCard(id));
};
