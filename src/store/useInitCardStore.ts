import { fetchPokemonCards } from "../api/pokemontcg/useFetchPokemonCards";
import { fetchPokemonSets } from "../api/pokemontcg/useFetchPokemonSets";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCardStore, selectCards, updateCardStore } from "./reducers/cards";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { clearSetStore, selectSets, updateSetStore } from "./reducers/sets";

const initCardsQuery = "set.id:pgo";
const initCardsSelect = "id,name,supertype,subtypes,types,set.id";
const initSetsQuery = "legalities.expanded:Legal";

export const useClearCardStorage = () => {
  const dispatch = useDispatch();
  dispatch(clearCardStore);
  dispatch(clearSetStore);
};

export const useInitCardStore = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards);
  const sets = useSelector(selectSets);
  console.log("Init check", cards, sets);

  useEffect(() => {
    console.log("UseEffect", cards?.length);
    if (!cards?.length) {
      fetchPokemonCards({ q: initCardsQuery, select: initCardsSelect }).then(
        (cards) => {
          console.log("Card fetch success", cards);
          dispatch(updateCardStore(cards as PokemonTCG.Card[]));
        }
      );
    }
  }, [dispatch, cards]);

  useEffect(() => {
    if (!sets?.length) {
      fetchPokemonSets({ q: initSetsQuery }).then((sets) => {
        console.log("Sets fetch success", sets);
        dispatch(updateSetStore(sets as PokemonTCG.Set[]));
      });
    }
  }, [dispatch, sets]);
};
