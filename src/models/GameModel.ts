import type { PlayerModel } from "../models/PlayerModel"

export type GameModel = {
    step: 'start' | 'shop' | 'battle' | 'end',
    maxCardsInDeck: number,
    player : PlayerModel
}