import { TCollectionDeck } from "../../store/reducers/collection";
import { solrockLunatone } from "../../../mocks/ptcgoDecks";
import { useEffect, useState } from "react";
import { parseCards } from "./TCGOListParser";
import { useFetchPokemonSets } from "../pokemontcg/useFetchPokemonSets";

export const useParseTCGODeckList = (
  ptcgoList: string
): TCollectionDeck | undefined => {
  const [deck, setDeck] = useState<TCollectionDeck>();
  const { data: sets } = useFetchPokemonSets({
    q: "legalities.expanded:Legal",
  });

  useEffect(() => {
    if (ptcgoList && sets) {
      const { name, amount, cards } = parseCards(solrockLunatone, sets);

      setDeck({
        name,
        ptcgoList,
        amount,
        cards,
      });
    }
  }, [sets, ptcgoList]);

  return deck;
};
