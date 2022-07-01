import { Card } from "pokemon-tcg-sdk-typescript/dist/interfaces/card";
import Image from "next/image";

const aspectRatio = 63.5 / 88.9;

export const CardImage = ({ card }: { card: Card }) => {
  if (!card) {
    return <></>;
  }

  return (
    <div style={{ padding: "5px" }}>
      <Image
        src={card.images.small}
        alt={card.name}
        height={200}
        width={200 * aspectRatio}
      />
    </div>
  );
};
