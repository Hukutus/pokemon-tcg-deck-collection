import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import Image from "next/image";
import { TCollectionCard } from "../../store/reducers/collection";
import { ComponentStyle } from "../../../pages/types";

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

  return (
    <div
      style={{ padding: "5px" }}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {card.images?.small ? (
        <Image
          src={card.images?.small}
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
