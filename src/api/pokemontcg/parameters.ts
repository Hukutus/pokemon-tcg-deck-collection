export const apiUri = "https://api.pokemontcg.io/v2";

export const headers = {
  "X-Api-Key": process.env.POKEMONTCG_API_KEY || "",
};

const legality = (format: string) => `set.legalities.${format}:Legal`;
export const standardLegal = legality("standard");
export const expandedLegal = legality("expanded");

export const glcBanList = {
  name: [
    "Lysandre's Trump Card",
    "Chip-Chip Ice Axe",
    "Forest of Giant Plants",
    "Hiker",
  ],
  id: ["sm5-114"],
};
