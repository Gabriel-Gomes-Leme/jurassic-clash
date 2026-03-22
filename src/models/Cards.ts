import { Rarity, type CardModel } from "./CardModel";

export const Cards : CardModel[] = [
    {
    id: 1,
    name: "T-Rex",
    image: '/assets/dino-deck/trex.webp',
    attack: 140,
    defense: 75,
    hp: 100,
    cost: 120,
    type: "carnivore",
    rarity: Rarity.LEGENDARY,
    description: "O predador supremo do período Cretáceo.",
  },
  {
    id: 2,
    name: "Mosassauro",
    image: "/assets/dino-deck/mosassauro.webp",
    attack: 130,
    defense: 60,
    hp: 130,
    cost: 125,
    type: "carnivore",
    rarity: Rarity.LEGENDARY,
    description: "Um predador mortal dos oceanos",
  },
]