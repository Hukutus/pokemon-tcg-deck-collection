import { useEffect, useState } from "react";
import { ComponentStyle } from "../types";

type Props = {
  onValueChange: (searchTerm: string) => void;
  style?: ComponentStyle;
};

const styles: ComponentStyle = {
  input: {
    fontSize: "16px",
    marginBottom: "10px",
  },
};

export const SearchInput = ({ onValueChange, style = {} }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.length) onValueChange(searchTerm);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [onValueChange, searchTerm]);

  return (
    <input
      style={{ ...styles.input, ...style }}
      value={searchTerm}
      placeholder="Search for Expanded cards"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
