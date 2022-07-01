export const apiUri = "https://api.pokemontcg.io/v2/";

export const headers = {
  "X-Api-Key": process.env.POKEMONTCG_API_KEY || "",
};
