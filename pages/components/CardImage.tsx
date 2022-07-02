import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import Image from "next/image";
import { TCollectionCard } from "../../store/reducers/collection";

const aspectRatio = 63.5 / 88.9;

type Props = {
  card: Card | TCollectionCard;
  onClick?: () => void;
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
      <Image
        src={card.images?.small}
        alt={card.name}
        height={200}
        width={200 * aspectRatio}
      />
    </div>
  );
};
