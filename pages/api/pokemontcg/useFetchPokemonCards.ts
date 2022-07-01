import { apiUri, headers } from "./parameters";
import { useQuery } from "react-query";

const fetchPokemonCards = (params: string) => {
  return fetch(`${apiUri}cards?q=${params}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => res?.data);
};

/*
 * set.name:generations subtypes:mega
 */
export const useFetchPokemonCards = (params: string) => {
  return useQuery(["fetchPokemonCard", params], () =>
    params ? fetchPokemonCards(params) : []
  );
};
