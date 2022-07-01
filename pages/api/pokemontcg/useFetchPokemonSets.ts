import { apiUri, headers } from "./parameters";
import { PokemonSetsResponse } from "./types";
import { useEffect, useState } from "react";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

/*
 * set.name:generations subtypes:mega
 */
export const useFetchPokemonSets = (params: string): PokemonSetsResponse => {
  const [sets, setSets] = useState<PokemonTCG.Set[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (params) {
      setLoading(true);
      setError(undefined);
      fetch(`${apiUri}cards?q=${params}`, {
        method: "GET",
        headers,
      })
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => {
          setSets(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
        });
    }
  }, [params]);

  return { sets, loading, error };
};
