import { apiUri, headers } from "./parameters";
import { PokemonCardFetchResponse } from "./types";
import { useEffect, useState } from "react";
import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";

export const useFetchPokemonCard = (id: string): PokemonCardFetchResponse => {
  const [card, setCard] = useState<Card>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${apiUri}cards/${id}`, {
      method: "GET",
      headers,
    })
      .then((res) => {
        return res.json();
      })
      .then(({ data }) => {
        setCard(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      });
  }, [id]);

  return { card, loading, error };
};
