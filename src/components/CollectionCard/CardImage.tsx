import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import Image from "next/image";
import { TCollectionCard } from "../../store/reducers/collection";
import { ComponentStyle } from "../../types";

const aspectRatio = 63.5 / 88.9;

type Props = {
  card: Card | TCollectionCard;
  onClick?: () => void;
};

const styles: ComponentStyle = {
  placeholder: {
    height: 200,
    width: 200 * aspectRatio,
    background: "gray",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};

const CardPlaceholder = ({ card }: Props) => {
  return (
    <div style={styles.placeholder}>
      <p>{card?.name}</p>
      <p>{card?.id}</p>
    </div>
  );
};

export const CardImage = ({ card, onClick }: Props) => {
  if (!card) {
    return <></>;
  }

  const imageSrc = card.images
    ? card.images.small
    : `https://images.pokemontcg.io/${card.id.split("-").join("/")}.png`;

  return (
    <div
      style={{ padding: "5px" }}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={card.name}
          height={200}
          width={200 * aspectRatio}
        />
      ) : (
        <CardPlaceholder card={card} />
      )}
    </div>
  );
};
