import { ComponentStyle } from "../../../pages/types";
import { useMemo } from "react";

const styles: ComponentStyle = {
  button: {
    display: "flex",
    flexDirection: "row",
  },
  add: {
    background: "green",
  },
  remove: {
    background: "orange",
  },
  delete: {
    background: "red",
  },
};

type Props = {
  type: "add" | "remove" | "delete";
  onClick: () => void;
  disabled?: boolean;
};

export const CollectionButton = ({ type, onClick, disabled }: Props) => {
  const icon = useMemo((): string => {
    switch (type) {
      case "add": {
        return "+";
      }
      case "remove": {
        return "-";
      }
      case "delete": {
        return "x";
      }
      default: {
        return "?";
      }
    }
  }, [type]);

  return (
    <button style={styles[type]} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
};
