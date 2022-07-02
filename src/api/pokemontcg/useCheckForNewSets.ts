import { apiUri, headers } from "./parameters";
import { useQuery } from "react-query";

const fetchPokemonSets = (params: string) => {
  return fetch(`${apiUri}sets?=${params}`, {
    headers,
  })
    .then((res) => res.json())
    .then((res) => res?.data);
};

export const useFetchPokemonSets = (params: string) => {
  return useQuery(["fetchPokemonSets", params], () =>
    params ? fetchPokemonSets(params) : []
  );
};
