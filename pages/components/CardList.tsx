import { useState } from "react";
import { Properties } from "csstype";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

import { useFetchPokemonCards } from "../api/pokemontcg/useFetchPokemonCards";
import { CardImage } from "./CardImage";
import {
  addCard,
  CollectionCard,
  removeCard,
  selectCollection,
} from "../../store/reducers/collection";
import { useDispatch, useSelector } from "react-redux";

const styles: { [key: string]: Properties<string | number> } = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export const CardList = () => {
  const [inputValue, setInputValue] = useState(
    "set.name:generations subtypes:mega"
  );
  const [params, setParams] = useState("");
  const { isLoading, isError, data: cards } = useFetchPokemonCards(params);
  const { cards: collectionCards } = useSelector(selectCollection);
  const dispatch = useDispatch();
  console.log("Got cards", cards, collectionCards);

  const addToCollection = (card: PokemonTCG.Card) => {
    dispatch(addCard(card));
  };

  const removeFromCollection = (card: CollectionCard) => {
    dispatch(removeCard(card));
  };

  return (
    <>
      <h2>Card database</h2>

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => setParams(inputValue)} disabled={isLoading}>
        Get cards
      </button>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!</div>}

      <div style={styles.container}>
        {cards?.map((card: PokemonTCG.Card) => (
          <CardImage
            key={card.id}
            card={card}
            onClick={() => addToCollection(card)}
          />
        ))}
        {!isLoading && !cards?.length && <div>No results!</div>}
      </div>

      <h2>Your collection</h2>

      <div style={styles.container}>
        {collectionCards?.map((card: CollectionCard) => (
          <div
            style={{ display: "flex", flexDirection: "column" }}
            key={card.id}
          >
            <CardImage card={card} onClick={() => removeFromCollection(card)} />
            <div>Owned: {card.owned}</div>
          </div>
        ))}
        {!isLoading && !cards?.length && <div>No results!</div>}
      </div>
    </>
  );
};
