import { useFetchPokemonCards } from "../api/pokemontcg/useFetchPokemonCards";
import { CardImage } from "./CardImage";
import { useState } from "react";
import { Properties } from "csstype";

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
  const { loading, error, cards } = useFetchPokemonCards(params);

  return (
    <>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => setParams(inputValue)} disabled={loading}>
        Get cards
      </button>

      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}

      <div style={styles.container}>
        {cards?.map((card) => (
          <CardImage key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};
