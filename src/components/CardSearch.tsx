import { useCallback, useState } from "react";
import { ComponentStyle } from "../types";
import { SearchInput } from "./SearchInput";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { fetchPokemonCards } from "../api/pokemontcg/useFetchPokemonCards";
import { CardImage } from "./CollectionCard/CardImage";
import { useDispatch } from "react-redux";
import { addCard, TCollectionCard } from "../store/reducers/collection";

const styles: ComponentStyle = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
};

export const CardSearch = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState<PokemonTCG.Card[]>([]);

  const addToCollection = (card: PokemonTCG.Card | TCollectionCard) => {
    dispatch(addCard(card));
  };

  const onSearchTermChange = useCallback((searchTerm: string) => {
    setLoading(true);
    setSearchTerm(searchTerm);
    fetchPokemonCards({
      q: `set.legalities.expanded:Legal name:${searchTerm}*`,
    }).then((cards) => {
      console.log("Got cards", cards);
      setLoading(false);
      setCards(cards);
    });
  }, []);

  return (
    <div style={styles.container}>
      <SearchInput onValueChange={onSearchTermChange} />

      <div style={styles.container}>
        {loading ? "Loading..." : ""}
        {!searchTerm?.length ? "Please write a search term!" : ""}
        {!loading && !cards?.length ? "No results for given search term!" : ""}
      </div>

      {cards?.map((card: PokemonTCG.Card) => (
        <CardImage
          key={card.id}
          card={card}
          onClick={() => addToCollection(card)}
        />
      ))}
    </div>
  );
};
