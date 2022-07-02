import { TCollectionDeck } from "../../store/reducers/collection";
import { solrockLunatone } from "../../../mocks/ptcgoDecks";
import { useEffect, useState } from "react";
import { parseCards } from "./TCGOListParser";
import { useSelector } from "react-redux";
import { selectSets } from "../../store/reducers/sets";

export const useParseTCGODeckList = (
  ptcgoList: string
): TCollectionDeck | undefined => {
  const [deck, setDeck] = useState<TCollectionDeck>();
  const sets = useSelector(selectSets);

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
