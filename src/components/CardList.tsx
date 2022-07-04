import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import {
  addCard,
  deleteCard,
  removeCard,
  selectCollection,
  TCollectionCard,
} from "../store/reducers/collection";
import { useDispatch, useSelector } from "react-redux";
import { ComponentStyle } from "../types";
import { CollectionCard } from "./CollectionCard/CollectionCard";
import { useParseTCGODeckList } from "../api/ptcgo/useParseTCGODeckList";
import { solrockLunatone } from "../../mocks/ptcgoDecks";
import { CardSearch } from "./CardSearch";

const styles: ComponentStyle = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export const CardList = () => {
  const { cards: collectionCards } = useSelector(selectCollection);
  const dispatch = useDispatch();
  const parsedList = useParseTCGODeckList(solrockLunatone);

  const addToCollection = (card: PokemonTCG.Card | TCollectionCard) => {
    dispatch(addCard(card));
  };

  const removeFromCollection = (card: TCollectionCard) => {
    dispatch(removeCard(card));
  };

  const deleteFromCollection = (card: TCollectionCard) => {
    const confirmed = confirm(
      "Are you sure you want to delete this card from your collection?"
    );

    if (confirmed) {
      dispatch(deleteCard(card));
    }
  };

  return (
    <>
      <h2>Card database</h2>

      <CardSearch />

      <h2>Your collection</h2>

      <div style={styles.container}>
        {collectionCards?.map((card: TCollectionCard) => (
          <CollectionCard
            key={card.id}
            card={card}
            onRemove={() => removeFromCollection(card)}
            onAdd={() => addToCollection(card)}
            onDelete={() => deleteFromCollection(card)}
          />
        ))}
        {!collectionCards?.length && <div>No collection!</div>}
      </div>

      <h2>PTCGO Deck Import</h2>

      <div style={styles.container}>
        {parsedList?.cards?.map((card) => (
          <CollectionCard
            key={card.id}
            card={card}
            onRemove={() => removeFromCollection(card)}
            onAdd={() => addToCollection(card)}
            onDelete={() => deleteFromCollection(card)}
          />
        ))}
        {!collectionCards?.length && <div>No collection!</div>}
      </div>
    </>
  );
};
