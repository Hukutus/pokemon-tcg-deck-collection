import {
  TCollectionCard,
  TCollectionDeck,
} from "../../store/reducers/collection";
import { solrockLunatone } from "../../../mocks/ptcgoDecks";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import { useFetchPokemonSets } from "../pokemontcg/useFetchPokemonSets";
import { useEffect, useState } from "react";

const BASIC_ENERGY_IDS: { [key: string]: string } = {
  Darkness: "sm1-170",
  Fairy: "sm1-172",
  Fighting: "sm1-169",
  Fire: "sm1-165",
  Grass: "sm1-164",
  Lightning: "sm1-167",
  Metal: "sm1-171",
  Psychic: "sm1-168",
  Water: "sm1-166",
};

// cardText format: <amount> <name> <card.set.ptcgoCode> <card.number>
const convertCardText = (
  cardRow: string,
  sets: PokemonTCG.Set[]
): TCollectionCard => {
  // Trim possible newlines
  // Get amount from the first element
  const [amount, ...rest] = cardRow.trim().split(" ");

  // Get set from the last two elements
  // This means only the name remains in rest
  const [ptcgoSet, setNumber] = rest.splice(-2);

  // Get set id to generate card id
  const apiSetId = sets.find((set) => set.ptcgoCode === ptcgoSet)?.id;

  // SwSh basic energy don't exist in the api, so replace them with SuMo cards
  const id =
    ptcgoSet === "SWSHEnergy"
      ? BASIC_ENERGY_IDS[rest[0]]
      : `${apiSetId}-${setNumber}`;

  // We can figure out the image urls with the setId and
  const imageUrlPart = id.split("-").join("/");

  return {
    amount: parseInt(amount),
    name: rest.join(" "),
    id,
    images: {
      large: `https://images.pokemontcg.io/${imageUrlPart}_hires.png`,
      small: `https://images.pokemontcg.io/${imageUrlPart}.png`,
    },
  };
};

const convertCardList = (
  cardLines: string[],
  sets: PokemonTCG.Set[]
): TCollectionCard[] => {
  return cardLines.map((cardLine) => convertCardText(cardLine, sets));
};

const parseCards = (
  ptcgoList: string,
  sets: PokemonTCG.Set[]
): TCollectionDeck => {
  // Filter out headers
  const parsedLines = ptcgoList
    .split("\n")
    .filter((val) => val && val.indexOf("##") !== 0);

  // First string is name row, ie. "Solrock Lunatone Deck List:"
  const splitName = parsedLines[0].split(" ");
  const name = splitName.splice(0, splitName.length - 2).join(" ");

  // Last string is summary row, ie. "Total Cards - 60"
  const amount = parseInt(parsedLines[parsedLines.length - 1].split(" - ")[1]);

  // Rest are cards, remove "* " from the beginning of each string to have clean rows
  const cardLines = parsedLines
    .splice(1, parsedLines.length - 2)
    .map((val) => val.substring(2));
  const cards = convertCardList(cardLines, sets);

  return {
    name,
    amount,
    cards,
    ptcgoList,
  };
};

export const useParseTCGODeckList = (
  ptcgoList: string
): TCollectionDeck | undefined => {
  const [deck, setDeck] = useState<TCollectionDeck>();
  const {
    isLoading,
    isError,
    data: sets,
  } = useFetchPokemonSets("legalities.expanded:Legal");

  useEffect(() => {
    if (!isLoading && !isError && ptcgoList) {
      const { name, amount, cards } = parseCards(solrockLunatone, sets);

      setDeck({
        name,
        ptcgoList,
        amount,
        cards,
      });
    }
  }, [isLoading, isError, sets, ptcgoList]);

  return deck;
};
