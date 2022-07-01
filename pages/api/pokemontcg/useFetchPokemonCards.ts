import { apiUri, headers } from "./parameters";
import { PokemonCardsFetchResponse } from "./types";
import { useEffect, useState } from "react";
import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

/*
 * set.name:generations subtypes:mega
 */
export const useFetchPokemonCards = (
  params: string
): PokemonCardsFetchResponse => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (params) {
      fetch(`${apiUri}cards?q=${params}`, {
        method: "GET",
        headers,
      })
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => {
          setCards(data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
        });
    }
  }, [params]);

  return { cards, loading, error };
};
