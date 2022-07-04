import { useCallback, useMemo, useState } from "react";
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
  searchRow: {
    display: "flex",
    justifyContent: "center",
  },
};

export const CardSearch = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState<PokemonTCG.Card[]>([]);
  const [showPokemon, setShowPokemon] = useState(true);
  const [showTrainers, setShowTrainers] = useState(true);
  const [showEnergy, setShowEnergy] = useState(true);

  const filteredCards = useMemo(() => {
    if (showPokemon && showTrainers && showEnergy) {
      return cards;
    }

    return cards.filter((card) => {
      if (showPokemon && card.supertype === "Pokémon") return true;
      if (showTrainers && card.supertype === "Trainer") return true;
      return showEnergy && card.supertype === "Energy";
    });
  }, [cards, showPokemon, showTrainers, showEnergy]);

  const addToCollection = (card: PokemonTCG.Card | TCollectionCard) => {
    dispatch(addCard(card));
  };

  const onSearchTermChange = useCallback((searchTerm: string) => {
    setLoading(true);
    setSearchTerm(searchTerm);
    fetchPokemonCards({
      q: `set.legalities.expanded:Legal name:${searchTerm}*`,
    }).then((cards) => {
      setLoading(false);
      setCards(cards);
    });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.searchRow}>
        <SearchInput onValueChange={onSearchTermChange} />
      </div>

      <div style={styles.searchRow}>
        <label htmlFor="pokemon-checkbox">
          <input
            id="pokemon-checkbox"
            type="checkbox"
            checked={showPokemon}
            onChange={(event) => setShowPokemon(event.target.checked)}
          />
          Pokemon
        </label>
        <label htmlFor="trainer-checkbox">
          <input
            id="trainer-checkbox"
            type="checkbox"
            checked={showTrainers}
            onChange={(event) => setShowTrainers(event.target.checked)}
          />
          Trainer
        </label>
        <label htmlFor="energy-checkbox">
          <input
            id="energy-checkbox"
            type="checkbox"
            checked={showEnergy}
            onChange={(event) => setShowEnergy(event.target.checked)}
          />
          Energy
        </label>
      </div>

      <div style={styles.container}>
        {loading ? "Loading..." : ""}
        {!searchTerm?.length ? "Please write a search term!" : ""}
        {!loading && searchTerm?.length && !cards?.length
          ? "No results for given search term!"
          : ""}
      </div>

      {filteredCards?.map((card: PokemonTCG.Card) => (
        <CardImage
          key={card.id}
          card={card}
          onClick={() => addToCollection(card)}
        />
      ))}
    </div>
  );
};
