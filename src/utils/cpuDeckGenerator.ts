import type { CardModel } from "../models/CardModel";

export function generateCpuDeck(avaliableCards: CardModel[], maxCards: number, cpuMoney: number) {
  const shuffled = [...avaliableCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, maxCards);
}