import type { CardModel } from "./CardModel"

export type PlayerModel={
    name: string,
    money: number,
    deck: CardModel[]
}