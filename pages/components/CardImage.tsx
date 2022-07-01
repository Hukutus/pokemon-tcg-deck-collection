import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import Image from "next/image";
import { CollectionCard } from "../../store/reducers/collection";

const aspectRatio = 63.5 / 88.9;

export const CardImage = ({
  card,
  onClick,
}: {
  card: Card | CollectionCard;
  onClick: () => void;
}) => {
  if (!card) {
    return <></>;
  }

  return (
    <div style={{ padding: "5px" }} onClick={onClick}>
      <Image
        src={(card as CollectionCard).image ?? (card as Card).images?.small}
        alt={card.name}
        height={200}
        width={200 * aspectRatio}
      />
    </div>
  );
};
