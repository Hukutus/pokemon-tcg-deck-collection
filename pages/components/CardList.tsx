import { useFetchPokemonCards } from "../api/pokemontcg/useFetchPokemonCards";
import { CardImage } from "./CardImage";

export const CardList = () => {
  const { loading, error, cards } = useFetchPokemonCards(
    "set.name:generations subtypes:mega"
  );

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}

      <div style={{ display: "flex" }}>
        {cards?.map((card) => (
          <CardImage key={card.id} card={card} />
        ))}
      </div>
    </>
  );
};
