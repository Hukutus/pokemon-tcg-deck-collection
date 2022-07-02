import { TCollectionCard as TCollectionCard } from "../../store/reducers/collection";
import { ComponentStyle } from "../../../pages/types";
import { CardImage } from "./CardImage";
import { CollectionButton } from "./CollectionButton";

const styles: ComponentStyle = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  buttonList: {
    display: "flex",
    justifyContent: "center",
  },
  textPadding: {
    padding: "0 10px",
  },
};

type Props = {
  card: TCollectionCard;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
};

export const CollectionCard = ({ card, onAdd, onRemove, onDelete }: Props) => {
  if (!card) {
    return <></>;
  }

  return (
    <div style={styles.container}>
      <CardImage card={card} />
      <div style={styles.buttonList}>
        <CollectionButton
          type="remove"
          onClick={onRemove}
          disabled={card.amount === 0}
        />
        <div style={styles.textPadding}>{card.amount}</div>
        <CollectionButton type="add" onClick={onAdd} />
        <div style={styles.textPadding}>/</div>
        <CollectionButton type="delete" onClick={onDelete} />
      </div>
    </div>
  );
};
