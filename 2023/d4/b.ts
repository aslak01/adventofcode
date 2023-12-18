const raw = await Bun.file("./d4/input.txt").text();
const input = raw.split("\n");

import { test as rawTest } from "./test-a.ts";
const test = rawTest.trim().split("\n");

const isTest = Bun.argv[2];

function main() {
  const data = isTest ? test : input;
  const deck = data.map(deserialise);
  const answer = buildStack(deck, 0, 0);
  console.log(answer);
}
main();

type Card = {
  numbers: string[][];
  amt: number;
};
type Deck = Card[];

function deserialise(c: string): Card {
  const [_meta, card] = c.split(":");
  return {
    numbers: card.split("|").map((l) => l.split(" ").filter((n) => n !== "")),
    amt: 1,
  };
}

function wins(card: string[][]) {
  const winners = card[1].filter((n) => card[0].includes(n));
  return winners.length;
}

function buildStack(
  cards: Deck,
  index: number,
  amt: number,
) {
  if (cards.length === 0) {
    return amt;
  }
  const [card, ...restCards] = cards;
  const won = wins(card.numbers);
  const newCards = Array.from({ length: won }, (_, index) => index);

  newCards.forEach((i) => {
    if (i < restCards.length) {
      restCards[i].amt += card.amt;
    }
  });

  return buildStack(restCards, index + 1, amt + card.amt);
}
